import React  from 'react';
import Routes from './routes';

import './css/cssStyle.css';

import Header   from './components/header';

const App = function() {
  return(
    <div className="App">
      <Header   />
      <Routes   />
    </div>
  );
};

export default App;
