import { ApolloClient } from 'apollo-client';
const { RpcIpcManager } = require('electron-simple-rpc');
import gql from 'graphql-tag';

export const createApolloClientProxier = <TCache>(client: ApolloClient<TCache>) => {

  const library = {
    submitOperation: async (operation: { query: string, variables: object }) => {
      return client.query({
        query: gql(operation.query),
        variables: operation.variables
      });
    },
  };

  new RpcIpcManager(library, 'graphql');
};
