import React, {Component} from 'react';
import Nav from './nav';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import History from "./Components/history";
class App extends Component {

  render() {
    return (
        <Router>
          <div className="App">
            <Nav/>
            <Route path="/history" component={History}/>
          </div>

            <div class="disclamer">
                <marquee><strong>Mutual Fund investments are subject to market risk. Please read All scheme-related document carefully before investing’.</strong></marquee>
            </div>
       </Router>

    );
  }


}

export default App;
