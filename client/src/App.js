import Header from "./components/Header";

import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import ButtonLink from "./components/ButtonLink";
import FeedBody from "./components/FeedBody";
import SideBar from "./components/SideBar";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import { userContext } from "./Context";
import axios from "axios";

function HeaderButtons({ user, handleLogout }) {
  if (user) {
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

function Body({user}) {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  //const [articles,setArticles] = useState([]);
  
  useEffect(() => {
    async function fetchDomains() {
      try {
        const { data: domains } = await axios.get("/articles/domains");
        setDomains(domains);
      } catch (e) {
        console.log(e);
      }
    }
    fetchDomains();
  }, []);



  return (
    <section className="flex flex-col md:flex-row ">
      <SideBar user={user} domains={domains} setSelectedDomain= {setSelectedDomain} />
      <FeedBody user={user} selectedDomain={selectedDomain} />
    </section>
  );
}

function App() {
  const [currentUser, setUser] = useState(null);
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("/auth/check", { withCredentials: true });
        setUser(JSON.stringify(res.data));
      } catch (e) {
        setUser(null);
      }
      //setIsLoading(false);
    }
    checkAuth();
  }, [currentUser]);
  //const [isLoading, setIsLoading] = useState(true);

  

  async function handleLogout() {
    try {
      await axios.get("/auth/logout");
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App max-w-screen-lg mx-auto">
      <userContext.Provider value={{ user: currentUser, setUser: setUser }}>
        <Header>
          <HeaderButtons user={currentUser} handleLogout={handleLogout} />
        </Header>
        <Switch>
          <Route path="/auth/signup">
            {currentUser ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Route path="/auth/login">
            {currentUser ? <Redirect to="/" /> : <LogIn />}
          </Route>
          <Route path="/">
            <Body user={currentUser} />
          </Route>
        </Switch>
      </userContext.Provider>
    </div>
  );
}

export default App;
