import { ApolloLink, Observable, Operation } from 'apollo-link';
const { rpc, RpcIpcManager } = require('electron-simple-rpc');
import { print } from 'graphql/language/printer';

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
    return new Observable((observer: ZenObservable.SubscriptionObserver<object>) => {
      rpc('graphql', 'submitOperation')({
        operationName: operation.operationName,
        variables: operation.variables,
        query: print(operation.query),
      })
        .then((result: object) => {
          observer.next(result);
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  }
}

export const createElectronRPCLink = () => new ElectronRPCLink();
