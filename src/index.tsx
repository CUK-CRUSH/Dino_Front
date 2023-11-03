import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
            <GoogleOAuthProvider clientId="570340729393-di58d6kk4ddsjh2gm0ps8d7prhk61tk8.apps.googleusercontent.com">
          <App />
            </GoogleOAuthProvider>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
