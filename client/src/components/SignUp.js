import { useState } from "react";
function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleEmailChange(e){
      setEmail(e.target.value);
  }
  function handlePasswordChange(e){
      setPassword(e.target.value);
  }
  return (
    <section className="w-full flex justify-center py-10">
      <form action="/auth/signup" method="POST" className="mb-4">
        <div className="mb-4">
          <label for="email" className=" block font-semibold text-gray-500 my-1">Email</label>
          <input type="text" id="email" name="email" className=" p-1 border-2" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-6">
          <label for="password" className="block font-semibold text-gray-500 my-1"> Password </label>
          <input type="password" id="password" name="password" className="p-1 border-2" value={password} onChange={handlePasswordChange}/>
        </div>

        <input type="submit" value="Sign up" className="text-white from-purple-500 to-indigo-500 bg-gradient-to-r px-4 py-2 font-semibold cursor-pointer"/>
      </form>
    </section>
  );
}

export default SignUp;
