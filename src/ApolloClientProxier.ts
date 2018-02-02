import { ApolloClient } from 'apollo-client';
const { RpcIpcManager } = require('electron-simple-rpc');
import gql from 'graphql-tag';

export const createApolloClientProxier = <TCache>(client: ApolloClient<TCache>) => {

  const library = {
    submitOperation: async (operation: {query: string}) => {
      return client.query({
        query: gql(operation.query),
      });
    },
  };

  new RpcIpcManager(library, 'graphql');
};
