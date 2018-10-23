import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import config from './config';

class ClientRouter extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>{renderRoutes(config)}</Switch>
      </BrowserRouter>
    );
  }
}

export default ClientRouter;
