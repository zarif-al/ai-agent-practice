import {
  NoSuchToolError,
  InvalidToolArgumentsError,
  ToolExecutionError,
  APICallError,
  TypeValidationError,
  NoObjectGeneratedError,
} from 'ai';

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

export function logVercelAISDKError(error: unknown) {
  if (error instanceof NoSuchToolError) {
    log.error('No such tool error:', { message: error.message });
  } else if (error instanceof InvalidToolArgumentsError) {
    log.error('Invalid tool arguments error:', { message: error.message });
  } else if (error instanceof ToolExecutionError) {
    log.error('Tool execution error:', { message: error.message });
  } else if (error instanceof APICallError) {
    log.error('API call error:', { message: error.message });
  } else if (error instanceof TypeValidationError) {
    log.error('Type validation error:', { message: error.message });
  } else if (error instanceof NoObjectGeneratedError) {
    log.error('No object generated error:', { message: error.message });
  } else {
    log.error('Unknown error:', { message: error });
  }
}
