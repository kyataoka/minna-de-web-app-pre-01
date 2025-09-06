export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface ValidationErrors {
  [key: string]: string | undefined;
}

export const validateField = (
  name: string,
  value: string,
  rules: Record<string, ValidationRule>
): string | undefined => {
  const rule = rules[name];
  if (!rule) return undefined;

  if (rule.required && !value.trim()) {
    return `${name}は必須項目です`;
  }

  if (rule.minLength && value.trim().length < rule.minLength) {
    return `${name}は${rule.minLength}文字以上で入力してください`;
  }

  if (rule.maxLength && value.trim().length > rule.maxLength) {
    return `${name}は${rule.maxLength}文字以内で入力してください`;
  }

  if (rule.pattern && !rule.pattern.test(value)) {
    return `${name}の形式が正しくありません`;
  }

  if (rule.custom) {
    return rule.custom(value);
  }

  return undefined;
};

export const validateAllFields = (
  formData: Record<string, string>,
  rules: Record<string, ValidationRule>
): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let isValid = true;

  Object.keys(formData).forEach((fieldName) => {
    const error = validateField(fieldName, formData[fieldName], rules);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

export const VALIDATION_RULES = {
  NAME: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  EMAIL: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!value.trim()) return 'メールアドレスは必須項目です';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return '有効なメールアドレスを入力してください';
      }
      return undefined;
    }
  },
  MESSAGE: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
} as const;