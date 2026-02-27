export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('La contrasenya ha de tenir almenys 8 caràcters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Ha de contenir almenys una majúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Ha de contenir almenys una minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Ha de contenir almenys un número');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Ha de contenir almenys un símbol especial');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateClassCode = (code: string): boolean => {
  const codeRegex = /^[A-Z]{3}\d{4}$/;
  return codeRegex.test(code);
};

export const generateClassCode = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter1 = letters[Math.floor(Math.random() * 26)];
  const letter2 = letters[Math.floor(Math.random() * 26)];
  const letter3 = letters[Math.floor(Math.random() * 26)];
  const number = Math.floor(1000 + Math.random() * 9000);
  return `${letter1}${letter2}${letter3}${number}`;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};