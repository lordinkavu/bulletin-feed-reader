import { useEffect,useState, useCallback} from "react";

import SiteName from "./SiteName";
import axios from 'axios';

export default function RightBar(props) {
    const [sites, setSites] = useState([]);
    const [userSites, setUserSites] = useState({});

    async function fetchUserSites(){
      try{
        const {data} = await axios.get("/user/sites")
      }catch(e){

      }
    }
    
    const fetchSites = useCallback(async()=>{
      try {
        const { data } = await axios.get(
          "/articles/sites/" + props.selectedDomain
        );
        setSites(data);
      } catch (e) {
        console.log(e);
      }
    },[props.selectedDomain]);
    
    
    useEffect(() => {
      fetchSites();
    }, [fetchSites]);
    
    if (!props.selectedDomain || props.selectedDomain === "all") {
      return <div></div>;
    } else {
      return (
        <div className="border-l md:w-4/12 flex flex-col space-y-2.5 pt-8 pl-4  flex-none">
          <div className="font-semibold text-gray-500">sites /</div>
          {sites.map((site) => (
        
            <SiteName key={site._id} site={site.site_name} _id={site._id} fetchSites={fetchSites}/>
          ))}
        </div>
      );
    }
  }