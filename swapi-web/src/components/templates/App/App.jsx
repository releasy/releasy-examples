import * as React from 'react';
import { renderRoutes } from 'react-router-config';

import logo from '../../../assets/logo.svg';
import './App.css';

class App extends React.PureComponent {
  render() {
    const { route } = this.props;
    
    return (
      <div className="App">
        <div className="App-content">
          <img src={logo} className="App-logo" alt="logo" />
          
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

export default App;
