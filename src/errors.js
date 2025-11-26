export class CypressYamlPluginError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = options.name ?? "CypressYamlPluginError";
    this.filePath = options.filePath;
    this.line = options.line;
    this.column = options.column;
    this.suggestion = options.suggestion;
  }
}

export class YamlLoaderError extends CypressYamlPluginError {
  constructor(message, options = {}) {
    super(message, { ...options, name: "YamlLoaderError" });
  }
}

export class YamlValidationError extends CypressYamlPluginError {
  constructor(message, options = {}) {
    super(message, { ...options, name: "YamlValidationError" });
    this.details = options.details;
  }
}

export class CommandRegistryError extends CypressYamlPluginError {
  constructor(message, options = {}) {
    super(message, { ...options, name: "CommandRegistryError" });
  }
}
