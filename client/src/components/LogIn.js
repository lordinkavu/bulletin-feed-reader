import { useState , useContext} from "react";
import axios from "axios";
import { userContext } from "../Context";
function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(userContext);
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res);
      setUser(res.data);
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="w-full flex justify-center py-10">
      <form action="/auth/login" method="POST" className="mb-4">
        <div className="mb-4">
          <label
            for="email"
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
            for="password"
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
