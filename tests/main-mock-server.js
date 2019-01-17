const { createElectronRPCGraphQLRequestExecutor } = require('../');
const { ApolloLink, Observable } = require('apollo-link');

// inspred from
// https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/__mocks__/mockLinks.ts
const mockLink = (mockedResponse, delay) =>
  new ApolloLink(operation =>
    new Observable(observer => {
      let timer = setTimeout(() => {
        observer.next(mockedResponse);
        observer.complete();
      }, delay ? delay : 0);

      return () => {
        clearTimeout(timer);
      };
    }
  )
);

// mock the RequestExecutor with a single returned
createElectronRPCGraphQLRequestExecutor({
  link: mockLink({ data: { a: 'foo' }})
});
