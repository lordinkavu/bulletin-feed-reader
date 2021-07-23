import Header from "./components/Header";
import Body from "./components/Body";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import ButtonLink from "./components/ButtonLink";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import { userContext } from "./Context";
import axios from "axios";

function App() {
  const [currentUser, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("/auth/check", { withCredentials: true });
        setUser(JSON.stringify(res.data));
      } catch (e) {
        setUser(null);
      }
      setIsLoading(false);
    }
    checkAuth();
  }, [currentUser]);


  async function handleLogout(){
    try{
      await axios.get('/auth/logout');
      setUser(null);
    }catch(e){
      console.log(e);
    }
  }

  console.log("current user", currentUser);
  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-10 w-10"></div>
      </div>
    );
  } else if (!currentUser) {
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
              <ButtonLink url="/feed" name="My feed" type="primary" />
              <div onClick={handleLogout}>
              <ButtonLink url="#" name="Log out" type="secondary" />
              </div>
              
            </Fragment>
          </Header>
          <Switch>
            <Route path="/feed">
              <div></div>
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
