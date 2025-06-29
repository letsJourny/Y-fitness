// PWA utilities for service worker registration and offline detection

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

// Register service worker
export const registerServiceWorker = async (): Promise<boolean> => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");

      // Handle service worker updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker is available
              showUpdateAvailable();
            }
          });
        }
      });

      console.log("Service Worker registered successfully");
      return true;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      return false;
    }
  }
  return false;
};

// Show update available notification
const showUpdateAvailable = () => {
  // You can integrate this with your toast system
  const event = new CustomEvent("show-toast", {
    detail: {
      type: "info",
      title: "Update Available",
      message: "A new version of the app is available. Refresh to update.",
      duration: 10000,
    },
  });
  window.dispatchEvent(event);
};

// Install app prompt
export const setupInstallPrompt = () => {
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;

    // Show install button/banner
    showInstallPrompt();
  });

  // Handle app installed
  window.addEventListener("appinstalled", () => {
    console.log("PWA was installed");
    deferredPrompt = null;

    // Hide install prompt and show success message
    hideInstallPrompt();

    const event = new CustomEvent("show-toast", {
      detail: {
        type: "success",
        title: "App Installed!",
        message: "Yousef Recharge has been installed successfully.",
      },
    });
    window.dispatchEvent(event);
  });
};

// Show install prompt UI
const showInstallPrompt = () => {
  // Create install banner
  const banner = document.createElement("div");
  banner.id = "install-banner";
  banner.className = `
    fixed bottom-4 left-4 right-4 bg-primary text-primary-foreground 
    p-4 rounded-lg shadow-lg z-50 flex items-center justify-between
    transform translate-y-full transition-transform duration-300
  `;

  banner.innerHTML = `
    <div class="flex-1">
      <h4 class="font-semibold">Install Yousef Recharge</h4>
      <p class="text-sm opacity-90">Get quick access and offline functionality</p>
    </div>
    <div class="flex gap-2">
      <button id="install-btn" class="bg-primary-foreground text-primary px-4 py-2 rounded text-sm font-medium">
        Install
      </button>
      <button id="dismiss-btn" class="text-primary-foreground/80 px-2">
        ×
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  // Animate in
  setTimeout(() => {
    banner.style.transform = "translateY(0)";
  }, 100);

  // Add event listeners
  const installBtn = banner.querySelector("#install-btn");
  const dismissBtn = banner.querySelector("#dismiss-btn");

  installBtn?.addEventListener("click", installApp);
  dismissBtn?.addEventListener("click", () => dismissInstallPrompt(banner));
};

// Install the app
const installApp = async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === "accepted") {
    console.log("User accepted the install prompt");
  } else {
    console.log("User dismissed the install prompt");
  }

  deferredPrompt = null;
  hideInstallPrompt();
};

// Dismiss install prompt
const dismissInstallPrompt = (banner: HTMLElement) => {
  banner.style.transform = "translateY(100%)";
  setTimeout(() => {
    banner.remove();
  }, 300);

  // Remember dismissal for this session
  sessionStorage.setItem("install-dismissed", "true");
};

// Hide install prompt
const hideInstallPrompt = () => {
  const banner = document.getElementById("install-banner");
  if (banner) {
    dismissInstallPrompt(banner);
  }
};

// Check if app is installed
export const isAppInstalled = (): boolean => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
};

// Offline detection
export const setupOfflineDetection = () => {
  const updateOnlineStatus = () => {
    if (navigator.onLine) {
      const event = new CustomEvent("show-toast", {
        detail: {
          type: "success",
          title: "Back Online",
          message: "Your connection has been restored.",
          duration: 3000,
        },
      });
      window.dispatchEvent(event);
    } else {
      const event = new CustomEvent("show-toast", {
        detail: {
          type: "error",
          title: "No Internet Connection",
          message: "You're currently offline. Some features may be limited.",
          duration: 5000,
        },
      });
      window.dispatchEvent(event);
    }
  };

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

// Show local notification
export const showNotification = (
  title: string,
  options?: NotificationOptions,
) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      ...options,
    });
  }
};

// Initialize PWA features
export const initializePWA = () => {
  // Register service worker
  registerServiceWorker();

  // Setup install prompt (only show if not dismissed and not installed)
  if (!sessionStorage.getItem("install-dismissed") && !isAppInstalled()) {
    setupInstallPrompt();
  }

  // Setup offline detection
  setupOfflineDetection();

  // Request notification permission after user interaction
  document.addEventListener(
    "click",
    () => {
      requestNotificationPermission();
    },
    { once: true },
  );
};
