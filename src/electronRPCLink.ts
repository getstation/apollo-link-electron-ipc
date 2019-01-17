import { ApolloLink, Observable, Operation } from 'apollo-link';
import { ExecutionResult, GraphQLError, print } from 'graphql';
import rxIpc from './rxIpc';


import { ISerializedGraphQLRequest, ISerializedExecutionResult } from './types';
const CHANNEL_NAME = 'apollo-link-electron-ipc/submit-operation';

/**
 * Apollo link that'll transfer the operations to a ApolloClientProxier via Electron IPC.
 */
export class ElectronRPCLink extends ApolloLink {
  constructor() {
    super();
  }

  public request(operation: Operation) {
    return new Observable((observer: ZenObservable.SubscriptionObserver<ExecutionResult>) => {
      rxIpc.runCommand(CHANNEL_NAME, null, {
        operationName: operation.operationName,
        variables: operation.variables,
        query: print(operation.query),
        context: operation.getContext(),
      } as ISerializedGraphQLRequest)
        .subscribe({
          next: (result: ISerializedExecutionResult) =>
            observer.next({
              data: result.data,
              errors: result.errors ? result.errors.map(m => new GraphQLError(m)): undefined
            }),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
    });
  }
}

export const createElectronRPCLink = () => new ElectronRPCLink();
