import { useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../Context";

function LogIn({setIsLoggedIn} ) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const {data:res} = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token",res.token);
      setIsLoggedIn(true);
    
    } catch (e) {

      setEmail("");
      setPassword("");
      switch (e) {
        case e.response.status===401:
          console.log("email or password is not correct ig");
          break;
        case e.response.status===500:
          console.log("internal server error");
          break;
        default:
          console.log("oops! there's an unexpected error");
      }
    }
  }

  return (
    <section className="w-full flex justify-center py-10">
      <form action="/auth/login" method="POST" className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className=" block font-semibold text-gray-500 my-1"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className=" p-1 border-2"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block font-semibold text-gray-500 my-1"
          >
            {" "}
            Password{" "}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-1 border-2"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <input
          type="submit"
          onClick={handleSubmit}
          value="Login"
          className="text-white from-purple-500 to-indigo-500 bg-gradient-to-r px-4 py-2 font-semibold cursor-pointer"
        />
      </form>
    </section>
  );
}

export default LogIn;
