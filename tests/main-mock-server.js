const { createElectronRPCGraphQLRequestExecutor } = require('../');
const { ApolloLink, Observable } = require('apollo-link');
const { Observable: RxObservable} =  require('rxjs');


const mockStreamingLink = (mockedResponses, delay) =>
  new ApolloLink(operation => 
    RxObservable.zip(
      RxObservable.from(mockedResponses),
      RxObservable.timer(200, delay || 500),
      function (item, i) { return item; }
    )
);

createElectronRPCGraphQLRequestExecutor({
  link: mockStreamingLink([
    { data: { a: 'bar' } },
    { data: { a: 'foo' } }
  ])
});

