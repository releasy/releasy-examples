import React from 'react';
import ReactDOM from 'react-dom';
import { ReleasyProvider, Config, Link } from 'react-releasy';

import App from './router/ClientRouter';

import './index.css';

const config = new Config({
  link: new Link({
    url: 'https://swapi-releasy.herokuapp.com',
  }),
});

ReactDOM.render(
  <ReleasyProvider config={config}>
    <App />
  </ReleasyProvider>,
  document.getElementById('root'),
);
