import Header from "./components/Header";
import   Body  from "./components/Body";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App ">
      <Header />
      <Switch>
        <Route path="/auth/signup">
          <div>Signup</div>
        </Route>
        <Route path='/auth/login'>
          <div>Login</div>
        </Route>
        <Route path="/">
          <Body/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
