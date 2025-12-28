import type { ExternalToast } from 'vue-sonner';
import type { ERROR_CODE_ENUMS } from '@/constants/error';
import type { NotificationToastType } from '@/types/error';
import { toast } from 'vue-sonner';

// AppError.ts
export class AppError extends Error {
  public readonly code?: ERROR_CODE_ENUMS;

  constructor(message?: string, code?: ERROR_CODE_ENUMS) {
    super(message);
    this.code = code;

    // Fix prototype chain for ES5/TS transpilation and make instanceof work
    Object.setPrototypeOf(this, new.target.prototype);

    // Optional: set the name to the class name (useful in logs)
    this.name = this.constructor.name;

    // Optional: capture nice stack trace in V8 (node/chrome)
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, this.constructor);
  }
}

export function generateToast(text: string, type: NotificationToastType, additionalContent?: ExternalToast) {
  const toastMethods = {
    INFO: toast.info,
    ERROR: toast.error,
    WARNING: toast.warning,
    SUCCESS: toast.success,
  };

  if (type === 'ERROR') {
    console.error('generateToast with ', text);
  }

  toastMethods[type](text, {
    closeButton: true,
    dismissible: true,
    duration: 5000,
    ...additionalContent,
  });
}
