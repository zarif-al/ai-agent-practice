// utils/logger.ts

const COLORS = {
  reset: '\x1b[0m',
  info: '\x1b[36m', // Cyan
  success: '\x1b[32m', // Green
  warning: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
};

export const log = {
  info: (message: string, ...optionalParams: object[]) => {
    console.log(
      `${COLORS.info}[INFO] ${message}${COLORS.reset}`,
      ...optionalParams
    );
  },
  success: (message: string, ...optionalParams: object[]) => {
    console.log(
      `${COLORS.success}[SUCCESS] ${message}${COLORS.reset}`,
      ...optionalParams
    );
  },
  warning: (message: string, ...optionalParams: object[]) => {
    console.warn(
      `${COLORS.warning}[WARNING] ${message}${COLORS.reset}`,
      ...optionalParams
    );
  },
  error: (message: string, ...optionalParams: object[]) => {
    console.error(
      `${COLORS.error}[ERROR] ${message}${COLORS.reset}`,
      ...optionalParams
    );
  },
};
