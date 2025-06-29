export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports international formats)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export const validateEmail = (email: string): ValidationError | null => {
  if (!email) {
    return { field: "email", message: "Email is required" };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { field: "email", message: "Please enter a valid email address" };
  }
  return null;
};

export const validateRequired = (
  value: string,
  fieldName: string,
): ValidationError | null => {
  if (!value?.trim()) {
    return { field: fieldName, message: `${fieldName} is required` };
  }
  return null;
};

export const validatePhone = (phone: string): ValidationError | null => {
  if (!phone) {
    return { field: "phone", message: "Phone number is required" };
  }
  if (!PHONE_REGEX.test(phone.replace(/\s|-|\(|\)/g, ""))) {
    return { field: "phone", message: "Please enter a valid phone number" };
  }
  return null;
};

export const validateAge = (age: string): ValidationError | null => {
  if (!age) {
    return { field: "age", message: "Age is required" };
  }
  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
    return { field: "age", message: "Age must be between 13 and 120" };
  }
  return null;
};

export const validateWeight = (weight: string): ValidationError | null => {
  if (!weight) {
    return { field: "weight", message: "Weight is required" };
  }
  const weightNum = parseFloat(weight);
  if (isNaN(weightNum) || weightNum < 20 || weightNum > 500) {
    return { field: "weight", message: "Weight must be between 20 and 500 kg" };
  }
  return null;
};

export const validateName = (name: string): ValidationError | null => {
  if (!name?.trim()) {
    return { field: "name", message: "Name is required" };
  }
  if (name.trim().length < 2) {
    return { field: "name", message: "Name must be at least 2 characters" };
  }
  if (name.trim().length > 50) {
    return { field: "name", message: "Name must be less than 50 characters" };
  }
  return null;
};

export const validateMessage = (message: string): ValidationError | null => {
  if (!message?.trim()) {
    return { field: "message", message: "Message is required" };
  }
  if (message.trim().length < 10) {
    return {
      field: "message",
      message: "Message must be at least 10 characters",
    };
  }
  if (message.trim().length > 1000) {
    return {
      field: "message",
      message: "Message must be less than 1000 characters",
    };
  }
  return null;
};

// Comprehensive form validation function
export const validateRegistrationForm = (data: {
  fullName: string;
  email: string;
  age: string;
  weight: string;
  gender: string;
  goal: string;
  phone?: string;
}): FormValidationResult => {
  const errors: ValidationError[] = [];

  // Validate each field
  const nameError = validateName(data.fullName);
  if (nameError) errors.push(nameError);

  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);

  const ageError = validateAge(data.age);
  if (ageError) errors.push(ageError);

  const weightError = validateWeight(data.weight);
  if (weightError) errors.push(weightError);

  const genderError = validateRequired(data.gender, "Gender");
  if (genderError) errors.push(genderError);

  const goalError = validateRequired(data.goal, "Fitness goal");
  if (goalError) errors.push(goalError);

  // Phone validation (if provided)
  if (data.phone) {
    const phoneError = validatePhone(data.phone);
    if (phoneError) errors.push(phoneError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateContactForm = (data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}): FormValidationResult => {
  const errors: ValidationError[] = [];

  // Validate each field
  const firstNameError = validateRequired(data.firstName, "First name");
  if (firstNameError) errors.push(firstNameError);

  const lastNameError = validateRequired(data.lastName, "Last name");
  if (lastNameError) errors.push(lastNameError);

  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);

  const subjectError = validateRequired(data.subject, "Subject");
  if (subjectError) errors.push(subjectError);

  const messageError = validateMessage(data.message);
  if (messageError) errors.push(messageError);

  return {
    isValid: errors.length === 0,
    errors,
  };
};
