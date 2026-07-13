function shouldSuppressExpectedDbFallbackLogs() {
  return process.env.SUPPRESS_EXPECTED_DB_FALLBACK_LOGS === '1';
}

export function logExpectedDbFallback(message: string, error: unknown) {
  if (shouldSuppressExpectedDbFallbackLogs()) return;
  console.warn(message, error);
}