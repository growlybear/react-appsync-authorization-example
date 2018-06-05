import React from 'react';
import ReactDOM from 'react-dom';
import Client from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider as Provider } from 'react-apollo'

import App from './App';
import config from './config/aws-appsync'

import './index.css';

const client = new Client({
  url: config.graphqlEndpoint,
  region: config.region,
  auth: {
    type: config.authenticationType,
    apiKey: config.apiKey
  }
})

const AppWithProvider = () => (
  <Provider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </Provider>
)

ReactDOM.render(
  <AppWithProvider />,
  document.getElementById('root')
);
