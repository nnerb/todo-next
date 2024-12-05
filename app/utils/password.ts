export const checkPasswordStrength = (password: string) => {
  const lengthCriteria = password.length;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (lengthCriteria < 6) {
    return 'Weak';
  } else if (lengthCriteria <= 10 && (hasLowerCase || hasUpperCase) && hasNumbers) {
    return 'Medium';
  } else if (
    lengthCriteria > 10 &&
    hasLowerCase &&
    hasUpperCase &&
    hasNumbers &&
    hasSpecialChars
  ) {
    return 'Strong';
  } else if (lengthCriteria > 10) {
    return 'Medium'; 
  }
  return 'Weak';
};