//import { useEffect } from "react";
function SideBar(props) {
  const user = JSON.parse(props.user);
  const domains = Array.from(props.domains);
  if(!user){
    return(
      <div className="border-r md:w-1/6 flex flex-col space-y-2.5 pt-8">
        <div className="font-semibold text-gray-500">explore /</div>
        {domains.map((domain) => (
        <div className="underline cursor-pointer" onClick={()=>props.setSelectedDomain(domain)}>{domain}</div>
      ))}
      </div>
    )
  }else{
    return (
      <div className="border-r md:w-1/6 flex flex-col space-y-2.5 pt-8">
        <div className="">today</div>
        {user && <div className="">saved</div>}
  
        <div className="font-semibold text-gray-500">feeds /</div>
        <div className="  ">all</div>
  
     
      </div>
    );
  }


}
export default SideBar;
