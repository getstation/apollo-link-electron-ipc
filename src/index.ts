export * from './ElectronRPCGraphQLRequestExecutor';
export * from './electronRPCLink';

export default {
  ...require('./ElectronRPCGraphQLRequestExecutor'),
  ...require('./electronRPCLink'),
}
