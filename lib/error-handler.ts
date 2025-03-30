type ErrorWithMessage = {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;
  
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message;
}

export function logServerError(error: unknown, context?: string): void {
  // In production, you might want to log to a service like Sentry
  console.error(`[Server Error]${context ? ` [${context}]` : ''}:`, getErrorMessage(error));
}

export function logClientError(error: unknown, context?: string): void {
  // In production, you might want to log to a service like Sentry
  console.error(`[Client Error]${context ? ` [${context}]` : ''}:`, getErrorMessage(error));
}
