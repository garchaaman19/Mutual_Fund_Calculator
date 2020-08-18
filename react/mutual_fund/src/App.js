import React from 'react';
import Nav from './nav';
import About from './About';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
    <div className="App">
      <Nav />
      <Route path="/about" component={About} />
    </div>
      </Router>
  );
}

export default App;
