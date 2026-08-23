const connectionErrorHints = [
  "querysrv",
  "econnrefused",
  "enotfound",
  "etimedout",
  "eservfail",
  "server selection",
  "failed to connect",
  "getaddrinfo",
  "dns",
];

const sensitiveMongoUriPattern = /mongodb(?:\+srv)?:\/\/[^@\s]+@/gi;

export const databaseUnavailableMessage =
  "Database is temporarily unavailable. Please check MongoDB Atlas network access, DNS, and environment variables.";

export function sanitizeBackendError(value: unknown) {
  const message = value instanceof Error ? value.message : String(value);
  return message.replace(sensitiveMongoUriPattern, "mongodb+srv://<credentials>@");
}

export function isDatabaseConnectionError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const name = error.name.toLowerCase();
  const message = error.message.toLowerCase();

  return (
    name === "mongoserverselectionerror" ||
    name === "mongonetworkerror" ||
    connectionErrorHints.some((hint) => message.includes(hint))
  );
}

export function databaseAwareMessage(error: unknown, fallback: string) {
  return isDatabaseConnectionError(error) ? databaseUnavailableMessage : fallback;
}

export function databaseAwareStatus(error: unknown, fallback = 400) {
  return isDatabaseConnectionError(error) ? 503 : fallback;
}

export function logBackendError(context: string, error: unknown) {
  const name = error instanceof Error ? error.name : "Error";
  console.error(`${context}: ${name}: ${sanitizeBackendError(error)}`);
}
