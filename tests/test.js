const assert = require('assert');
const gql = require('graphql-tag');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } =require('apollo-cache-inmemory');

describe('end-to-end', function () {
  let client;

  before(() => {
    const { createElectronRPCLink } = require('../');
    client = new ApolloClient({
      link: createElectronRPCLink(),
      cache: new InMemoryCache(),
    });
  })

  it('client.query returns a result', function () {
    const query = gql`
      {
        a
      }
    `; 
    return client.query({ query })
    .then(res => {
      assert.strictEqual(res.data.a, 'foo');
    })
  })
});
