export * from './ApolloClientProxier';
export * from './electronRPCLink';

export default {
  ...require('./ApolloClientProxier'),
  ...require('./electronRPCLink'),
}
