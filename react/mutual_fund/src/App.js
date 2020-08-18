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
        <div>
          <label htmlFor="name">Name (4 to 8 characters):</label>

          <input type="text" id="name" name="name" required
                 minLength="4" maxLength="8" size="10">
          </input>
        </div>
      </Router>

  );
}

export default App;
