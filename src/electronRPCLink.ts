import { ApolloLink, Observable, Operation } from 'apollo-link';
import { ExecutionResult, GraphQLError } from 'graphql';

const { rpc, RpcIpcManager } = require('electron-simple-rpc');
import { print } from 'graphql/language/printer';

import { ISerializedGraphQLRequest, ISerializedExecutionResult } from './types';

/**
 * Apollo link that'll transfer the operations to a ApolloClientProxier via Electron IPC.
 */
export class ElectronRPCLink extends ApolloLink {
  constructor() {
    super();

    // we need to instanciate that to receive RPCs
    new RpcIpcManager({}, 'graphql', { ignoreMissingFunctions : true });
  }

  public request(operation: Operation) {
    return new Observable((observer: ZenObservable.SubscriptionObserver<ExecutionResult>) => {
      rpc('graphql', 'submitOperation')({
        operationName: operation.operationName,
        variables: operation.variables,
        query: print(operation.query),
        context: operation.getContext(),
      } as ISerializedGraphQLRequest)
        .then((result: ISerializedExecutionResult) => {
          observer.next({
            data: result.data,
            errors: result.errors ? result.errors.map(m => new GraphQLError(m)): undefined
          });
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  }
}

export const createElectronRPCLink = () => new ElectronRPCLink();
