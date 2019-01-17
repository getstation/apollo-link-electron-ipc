const assert = require('assert');
const gql = require('graphql-tag');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } =require('apollo-cache-inmemory');
const { ApolloLink, Observable } = require('apollo-link');
const { Observable: RxObservable } = require('rxjs');

describe('end-to-end', function () {
  let client;
  let link;

  before(() => {
    const { createElectronRPCLink } = require('../');
    link = createElectronRPCLink();
  });
  
  beforeEach(() => {
    client = new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
      // see https://github.com/apollographql/apollo-client/issues/4322
      queryDeduplication: false,
    });
  })

  it('client.query returns a result', function () {
    const query = gql`
      query {
        a
      }
    `; 
    return client.query({ query })
    .then(res => {
      assert.equal(res.data.a, 'bar');
    })
  })
  it('client.query returns a result', function () {
    const query = gql`
      query {
        a
      }
    `;
    return new Promise((resolve, reject) => {
      const aValues = [];
      client.watchQuery({ query })
        .subscribe(res => {
          aValues.push(res.data.a);
          if (aValues.length == 2) {
            assert.equal(aValues[0], 'bar');
            assert.equal(aValues[1], 'foo');
            resolve();
          }
        });
    })
  })
});
