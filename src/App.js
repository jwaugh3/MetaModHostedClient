import './App.css';
import Login from './Components/Login/Login';
import Connect from './Components/Connect/Connect'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/authorize">
            <div className="App">
              <Login/>
            </div>
          </Route>
          <Route path="/connect">
            <Connect />
          </Route>
        </Switch>
      </Router>

  );
}

export default App;
