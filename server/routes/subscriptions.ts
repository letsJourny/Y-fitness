import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// Validation schemas
const subscriptionPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  currency: z.string().default("KWD"),
  interval: z.enum(["month", "quarter", "year"]),
  intervalCount: z.number().min(1).default(1),
  features: z.array(z.string()),
  isPopular: z.boolean().default(false),
  isActive: z.boolean().default(true),
  stripeProductId: z.string().optional(),
  stripePriceId: z.string().optional(),
});

const createSubscriptionSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  paymentMethodId: z.string().min(1, "Payment method is required"),
  billingAddress: z.object({
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    postal_code: z.string().min(1, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
  }),
});

const updateSubscriptionSchema = z.object({
  planId: z.string().optional(),
  status: z.enum(["active", "paused", "cancelled"]).optional(),
});

// Subscription Plans CRUD
export const createSubscriptionPlan: RequestHandler = async (req, res) => {
  try {
    const validatedData = subscriptionPlanSchema.parse(req.body);

    // Create Stripe product and price
    let stripeProductId = validatedData.stripeProductId;
    let stripePriceId = validatedData.stripePriceId;

    if (!stripeProductId) {
      const product = await stripe.products.create({
        name: validatedData.name,
        description: validatedData.description,
      });
      stripeProductId = product.id;
    }

    if (!stripePriceId) {
      const price = await stripe.prices.create({
        product: stripeProductId,
        unit_amount: Math.round(validatedData.price * 100), // Convert to cents
        currency: validatedData.currency.toLowerCase(),
        recurring: {
          interval:
            validatedData.interval === "quarter"
              ? "month"
              : validatedData.interval,
          interval_count:
            validatedData.interval === "quarter"
              ? 3
              : validatedData.intervalCount,
        },
      });
      stripePriceId = price.id;
    }

    const plan = await prisma.subscriptionPlan.create({
      data: {
        ...validatedData,
        stripeProductId,
        stripePriceId,
      },
    });

    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Create subscription plan error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create subscription plan",
    });
  }
};

export const getSubscriptionPlans: RequestHandler = async (req, res) => {
  try {
    const { isActive = true } = req.query;

    const plans = await prisma.subscriptionPlan.findMany({
      where: {
        isActive: isActive === "true",
      },
      orderBy: [{ isPopular: "desc" }, { price: "asc" }],
    });

    res.json({ success: true, data: plans });
  } catch (error) {
    console.error("Get subscription plans error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscription plans",
    });
  }
};

export const getSubscriptionPlan: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id },
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found",
      });
    }

    res.json({ success: true, data: plan });
  } catch (error) {
    console.error("Get subscription plan error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscription plan",
    });
  }
};

export const updateSubscriptionPlan: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = subscriptionPlanSchema.partial().parse(req.body);

    const plan = await prisma.subscriptionPlan.update({
      where: { id },
      data: validatedData,
    });

    res.json({ success: true, data: plan });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Update subscription plan error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update subscription plan",
    });
  }
};

// User Subscription Management
export const createSubscription: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const validatedData = createSubscriptionSchema.parse(req.body);

    // Get the subscription plan
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: validatedData.planId },
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found",
      });
    }

    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName,
        address: validatedData.billingAddress,
      });
      stripeCustomerId = customer.id;

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      });
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(validatedData.paymentMethodId, {
      customer: stripeCustomerId,
    });

    // Set as default payment method
    await stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: validatedData.paymentMethodId,
      },
    });

    // Create Stripe subscription
    const stripeSubscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: plan.stripePriceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    // Create subscription in database
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId: validatedData.planId,
        stripeSubscriptionId: stripeSubscription.id,
        stripeCustomerId,
        status: "pending",
        currentPeriodStart: new Date(
          stripeSubscription.current_period_start * 1000,
        ),
        currentPeriodEnd: new Date(
          stripeSubscription.current_period_end * 1000,
        ),
        billingAddress: validatedData.billingAddress,
      },
      include: {
        plan: true,
      },
    });

    res.status(201).json({
      success: true,
      data: subscription,
      clientSecret: (stripeSubscription.latest_invoice as any)?.payment_intent
        ?.client_secret,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Create subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create subscription",
    });
  }
};

export const getUserSubscription: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: ["active", "pending", "past_due"] },
      },
      include: {
        plan: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: subscription });
  } catch (error) {
    console.error("Get user subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user subscription",
    });
  }
};

export const updateSubscription: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateSubscriptionSchema.parse(req.body);

    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: { plan: true },
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    let updatedSubscription = subscription;

    // Handle plan change
    if (validatedData.planId && validatedData.planId !== subscription.planId) {
      const newPlan = await prisma.subscriptionPlan.findUnique({
        where: { id: validatedData.planId },
      });

      if (!newPlan) {
        return res.status(404).json({
          success: false,
          message: "New plan not found",
        });
      }

      // Update Stripe subscription
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        items: [
          {
            id: (
              await stripe.subscriptions.retrieve(
                subscription.stripeSubscriptionId,
              )
            ).items.data[0].id,
            price: newPlan.stripePriceId,
          },
        ],
        proration_behavior: "create_prorations",
      });

      updatedSubscription = await prisma.subscription.update({
        where: { id },
        data: { planId: validatedData.planId },
        include: { plan: true },
      });
    }

    // Handle status change
    if (validatedData.status && validatedData.status !== subscription.status) {
      if (validatedData.status === "cancelled") {
        // Cancel Stripe subscription
        await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
      } else if (validatedData.status === "paused") {
        // Pause Stripe subscription
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
          pause_collection: { behavior: "keep_as_draft" },
        });
      } else if (
        validatedData.status === "active" &&
        subscription.status === "paused"
      ) {
        // Resume Stripe subscription
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
          pause_collection: null,
        });
      }

      updatedSubscription = await prisma.subscription.update({
        where: { id },
        data: { status: validatedData.status },
        include: { plan: true },
      });
    }

    res.json({ success: true, data: updatedSubscription });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Update subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update subscription",
    });
  }
};

export const cancelSubscription: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { immediately = false } = req.query;

    const subscription = await prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    if (immediately === "true") {
      // Cancel immediately
      await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);

      await prisma.subscription.update({
        where: { id },
        data: {
          status: "cancelled",
          cancelledAt: new Date(),
        },
      });
    } else {
      // Cancel at period end
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      await prisma.subscription.update({
        where: { id },
        data: {
          cancelAtPeriodEnd: true,
          cancelledAt: new Date(),
        },
      });
    }

    res.json({ success: true, message: "Subscription cancelled successfully" });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel subscription",
    });
  }
};

// Payment Methods
export const getPaymentMethods: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.stripeCustomerId) {
      return res.json({ success: true, data: [] });
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: "card",
    });

    res.json({ success: true, data: paymentMethods.data });
  } catch (error) {
    console.error("Get payment methods error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment methods",
    });
  }
};

export const addPaymentMethod: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { paymentMethodId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.stripeCustomerId) {
      return res.status(400).json({
        success: false,
        message: "User has no Stripe customer ID",
      });
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    res.json({ success: true, data: paymentMethod });
  } catch (error) {
    console.error("Add payment method error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add payment method",
    });
  }
};

export const removePaymentMethod: RequestHandler = async (req, res) => {
  try {
    const { paymentMethodId } = req.params;

    await stripe.paymentMethods.detach(paymentMethodId);

    res.json({ success: true, message: "Payment method removed successfully" });
  } catch (error) {
    console.error("Remove payment method error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove payment method",
    });
  }
};

// Stripe Webhooks
export const handleStripeWebhook: RequestHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  try {
    switch (event.type) {
      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
};

// Webhook helper functions
async function handlePaymentSucceeded(invoice: any) {
  const subscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: invoice.subscription },
  });

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "active",
        lastPaymentAt: new Date(),
      },
    });
  }
}

async function handlePaymentFailed(invoice: any) {
  const subscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: invoice.subscription },
  });

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "past_due" },
    });
  }
}

async function handleSubscriptionUpdated(stripeSubscription: any) {
  const subscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: stripeSubscription.id },
  });

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: stripeSubscription.status,
        currentPeriodStart: new Date(
          stripeSubscription.current_period_start * 1000,
        ),
        currentPeriodEnd: new Date(
          stripeSubscription.current_period_end * 1000,
        ),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      },
    });
  }
}

async function handleSubscriptionDeleted(stripeSubscription: any) {
  const subscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: stripeSubscription.id },
  });

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "cancelled",
        cancelledAt: new Date(),
      },
    });
  }
}
