import Header from "./components/Header";
import Body from "./components/Body";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import ButtonLink from "./components/ButtonLink";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState, Fragment } from "react";
import  {userContext}  from "./Context";



function App() {
  const [currentUser, setUser] = useState(null);
  console.log("current user",currentUser);
  if (!currentUser) {
    return (
      <div className="App ">
        <userContext.Provider value={{ user: currentUser, setUser: setUser }}>
          <Header>
            <Fragment>
              {" "}
              <ButtonLink url="/auth/signup" name="Sign up" type="primary" />
              <ButtonLink url="/auth/login" name="Log in" type="secondary" />
              
            </Fragment>
          </Header>
          <Switch>
            <Route path="/auth/signup">
              <SignUp />
            </Route>
            <Route path="/auth/login">
              <LogIn />
            </Route>
            <Route path="/">
              <Body />
            </Route>
          </Switch>
        </userContext.Provider>
      </div>
    );
  } else {
    return (
      <div className="App ">
        <userContext.Provider value={{ user: currentUser, setUser: setUser }}>
          <Header>
            <Fragment>
              <ButtonLink url="/" name="My feed" type="primary" />
              <ButtonLink url="/auth/logout" name="Log out" type="secondary" />
            </Fragment>
          </Header>
          <Switch>
            <Route path="/auth/signup">
              <Redirect to="/" />
            </Route>
            <Route path="/auth/login">
              <Redirect to="/" />
            </Route>
            <Route path="/">
              <Body />
            </Route>
          </Switch>
          
        </userContext.Provider>
      </div>
    );
  }
}

export default App;
