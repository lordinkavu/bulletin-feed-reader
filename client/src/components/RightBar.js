import { useEffect,useState} from "react";

import SiteName from "./SiteName";
import axios from 'axios';

export default function RightBar(props) {
    const [sites, setSites] = useState();
    
  
    useEffect(() => {
      async function fetchSites() {
        try {
          const { data: sites } = await axios.get(
            "/articles/sites/" + props.selectedDomain
          );
          setSites(sites);
        } catch (e) {
          console.log(e);
        }
      }
      fetchSites();
    }, [props.selectedDomain]);
    if (!props.selectedDomain || props.selectedDomain === "all") {
      return <div></div>;
    } else {
      return (
        <div className="border-l md:w-4/12 flex flex-col space-y-2.5 pt-8 pl-4  flex-none">
          <div className="font-semibold text-gray-500">sites /</div>
          {sites.map((site) => (
        
            <SiteName key={site._id} site={site.site_name} _id={site._id}/>
          ))}
        </div>
      );
    }
  }