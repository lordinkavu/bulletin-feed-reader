import Header from "./components/Header";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import ButtonLink from "./components/ButtonLink";
import Body from "./components/Body";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import { userContext } from "./Context";


function HeaderButtons({ isLoggedIn,setIsLoggedIn }) {
  function handleLogout(){
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  if (isLoggedIn) {
    return (
      <Fragment>
        <div onClick={handleLogout}>
          <ButtonLink url="#" name="Log out" type="secondary" />
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {" "}
        <ButtonLink url="/auth/signup" name="Sign up" type="primary" />
        <ButtonLink url="/auth/login" name="Log in" type="secondary" />
      </Fragment>
    );
  }
}


function App() {

  const [currentUser, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(()=>{
    if(localStorage.getItem("token"))
    setIsLoggedIn(true);
  },[])

  return (
    <div className="App max-w-screen-lg mx-auto">
      <userContext.Provider value={{ user: currentUser, setUser: setUser, isLoggedIn:isLoggedIn }}>
        <Header>
          <HeaderButtons isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Header>
        <Switch>
          <Route path="/auth/signup">
            {isLoggedIn ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Route path="/auth/login">
            {isLoggedIn ? <Redirect to="/" /> : <LogIn setIsLoggedIn={setIsLoggedIn} />}
          </Route>
          <Route path="/">
            <Body/>
          </Route>
        </Switch>
      </userContext.Provider>
    </div>
  );
}

export default App;
