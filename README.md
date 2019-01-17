# apollo-link-electron-ipc

> In electron, forward GraqhQL operations to the main process

[![NPM Version][npm-image]][npm-url]


## Install

```bash
npm i -S apollo-link-electron-ipc
```

## Usage

```ts
// in main
import { createElectronRPCGraphQLRequestExecutor } from 'apollo-link-electron-ipc';
import { HttpLink } from 'apollo-link-http';
import fetch from 'electron-fetch';

// example with HttpLink
createElectronRPCGraphQLRequestExecutor({
  new HttpLink({
    uri: 'your-endpoint',
    fetch
  })
});


// in renderer
import { createElectronRPCLink } from 'apollo-link-electron-ipc';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: createElectronRPCLink(),
  cache: new InMemoryCache(),
});

client.query(MY_QUERY);
```

### Streaming link
⚠️ apollo-link-electron-ipc supports `ObservableQueries` with streaming links, but requires to instantiate `ApolloClient` with option `queryDeduplication: false,`. See  [apollographql/apollo-client#4322](https://github.com/apollographql/apollo-client/issues/4322)


## License

[MIT](http://mit-license.org)

[npm-image]: https://img.shields.io/npm/v/apollo-link-electron-ipc.svg
[npm-url]: https://npmjs.org/package/apollo-link-electron-ipc