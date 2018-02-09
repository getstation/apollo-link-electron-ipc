const { RpcIpcManager } = require('electron-simple-rpc');
import gql from 'graphql-tag';
import { ApolloLink, GraphQLRequest, execute } from 'apollo-link';
import { ExecutionResult } from 'graphql';

import { ISerializedGraphQLRequest, ISerializedExecutionResult } from './types';


export const createElectronRPCGraphQLRequestExecutor = ({ link }: { link: ApolloLink }) => {
  const library = {
    // TODO: for real-time queries we might need to rely on
    // remote observable rather than RPCs
    submitOperation: (req: ISerializedGraphQLRequest) => new Promise<ISerializedExecutionResult>((resolve, reject) => {
      const request: GraphQLRequest = {
        ...req, query: gql(req.query),
      }

      execute(link, request).subscribe({
        next: (res: ExecutionResult) => resolve({
          data: res.data,
          errors: res.errors ? res.errors.map(e => e.message): []
        }),
        error: (error: Error) => reject(error)
      });
    })
  };

  new RpcIpcManager(library, 'graphql');
}
