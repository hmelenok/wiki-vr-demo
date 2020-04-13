import React from "react";
import "./App.css";
import AframeDemo from "./components/AframeDemo";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">none yet</Route>
          <Route path="/users">none yet</Route>
          <Route path="/">
            <AframeDemo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
