import rxIpc from 'rx-ipc-electron/lib/main';
import { ApolloLink, GraphQLRequest, execute } from 'apollo-link';
import { parse } from 'graphql';
import { Observable } from 'rxjs';


import { ISerializedGraphQLRequest, ISerializedExecutionResult } from './types';

const CHANNEL_NAME = 'apollo-link-electron-ipc/submit-operation';

export const createElectronRPCGraphQLRequestExecutor = ({ link }: { link: ApolloLink }) => {
  rxIpc.registerListener(CHANNEL_NAME, (req: ISerializedGraphQLRequest) => {
    const request: GraphQLRequest = {
      ...req, query: parse(req.query),
    }

    return Observable.from<ISerializedExecutionResult>(execute(link, request));
  });
}
