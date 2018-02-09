export interface ISerializedGraphQLRequest {
  query: string;
  variables?: object;
  operationName?: string;
  context?: Record<string, any>;
  extensions?: Record<string, any>;
}

export interface ISerializedExecutionResult {
  data?: object;
  errors?: string[];
}
