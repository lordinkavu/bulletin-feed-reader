import { useEffect, useState, useContext } from "react";
import { userContext } from "../Context";
import axios from "axios";
/* 
function DomainName({domain, setSelectedDomain}){
  function domainChange(domain){
    setSelectedDomain(domain);
  }
  return(
    <div className="underline cursor-pointer" onClick={domainChange}>{domain}</div>
  )
} */

function SideBar(props) {
  const [domains, setDomains] = useState([]);
  const user = JSON.parse(useContext(userContext).user);

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
      <div className="border-r md:w-2/12 flex flex-col space-y-2.5 pt-8 flex-none">
        <div className="font-semibold text-gray-500">explore /</div>
        {domains.map((domain) => (
          <div
            className="underline cursor-pointer"
            onClick={() => props.setSelectedDomain(domain)}
            key={domain}
          >
            {domain}
          </div>
        ))}
      </div>
    );
  /* } else {
    return (
      <div className="border-r md:w-2/12 flex flex-col space-y-2.5 pt-8 flex-none">
        <div className="">today</div>
        {user && <div className="">saved</div>}

        <div className="font-semibold text-gray-500">feeds /</div>
        <div className="  ">all</div>
      </div>
    );
  } */
}
export default SideBar;
