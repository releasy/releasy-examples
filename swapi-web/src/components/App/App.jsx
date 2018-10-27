import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import logo from '../../assets/logo.svg';
import './App.css';

const AllFilms = Loadable({
  loader: () => import(/* webpackChunkName: "AllFilms" */ '../AllFilms/AllFilms'),
  loading: () => null,
  modules: ['AllFilms'],
});

const Film = Loadable({
  loader: () => import(/* webpackChunkName: "Film" */ '../Film/Film'),
  loading: () => null,
  modules: ['Film'],
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <img src={logo} className="App-logo" alt="logo" />

          <Switch>
            <Route exact path="/" component={AllFilms} />
            <Route path="/:id" component={Film} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
