import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import { ReleasyProvider, Config, Link } from 'react-releasy';

import App from './components/App/App';

import './index.css';

const config = new Config({
  link: new Link({
    url: 'https://swapi-releasy.herokuapp.com',
  }),
});

const Application = (
  <ReleasyProvider config={config}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReleasyProvider>
);

const root = document.getElementById('root');

if (root.hasChildNodes() === true) {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(Application, root);
  });
} else {
  ReactDOM.render(Application, root);
}
