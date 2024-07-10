import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloClientOptions, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

@NgModule({
  exports: [ApolloModule],
})
export class GraphQLModule {
  constructor(private httpLink: HttpLink) {}

  public createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    const http = httpLink.create({
      uri: 'http://localhost:3000/graphql',
    });

    const ws = new WebSocketLink({
      uri: `ws://localhost:3000`,
      options: {
        reconnect: true,
      },
    });

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      ws,
      http,
    );

    return {
      link,
      cache: new InMemoryCache(),
    };
  }
}

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return new GraphQLModule(httpLink).createApollo(httpLink);
}

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLConfigModule {}
