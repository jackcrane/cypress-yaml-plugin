let cachedStepSchema = null;
let cachedSpecSchema = null;
let cachedJsonSchema = null;

export function getCachedStepSchema() {
  return cachedStepSchema;
}

export function setCachedStepSchema(schema) {
  cachedStepSchema = schema;
}

export function getCachedSpecSchema() {
  return cachedSpecSchema;
}

export function setCachedSpecSchema(schema) {
  cachedSpecSchema = schema;
}

export function getCachedJsonSchema() {
  return cachedJsonSchema;
}

export function setCachedJsonSchema(schema) {
  cachedJsonSchema = schema;
}

export function clearSchemaCache() {
  cachedStepSchema = null;
  cachedSpecSchema = null;
  cachedJsonSchema = null;
}
