import React, { useContext } from "react";
import { userContext } from "../Context";
import axios from 'axios';
function DomainCard(props) {
  let emoji, color;
  let user = JSON.parse(useContext(userContext).user);

  
  
  
 
  switch (props.name) {
    case "technology":
      emoji = "👩‍💻";
      color = "purple";
      break;
    case "business":
      emoji = "💸";
      color = "green";
      break;
    case "opinions":
      emoji = "💬";
      color = "blue";
      break;
    case "insighful":
      emoji = "💡";
      color = "red";
      break;
    case "comic":
      emoji = "🐱‍🏍";
      color = "yellow";
      break;
    case "news":
      emoji = "📰";
      color = "indigo";
      break;
    default:
      emoji = "⭐";
      color = "red";
  }

  async function handleAddClick(){
    try{
      const res = await axios.post(`/user/add/domain/${props.name}`);
      console.log(res);
    }catch(e){
      console.log(e);
    }
  }

  function setDomain() {
    props.setActiveDomain(props.name);
  }
  return (
    <div className={`flex m-3`}>
    <div
      onClick={setDomain}
      className={`font-light px-2 py-0.5 text-sm md:text-base md:px-4 md:py-1 cursor-pointer m-px mr-0  ${
        props.name === props.activeDomain
          ? `text-white bg-${color}-500`
          : ` border-2 border-${color}-500`
      } `}
    >
      {props.name + " " + emoji}
    </div>
     {user!==null && 
    <div className={` border border-${color}-500 border-l-0 px-2 py-0.5 md:px-4 md:py-1 m-px ml-0 cursor-pointer`} onClick={handleAddClick} >
      +
    </div>}
    </div>
  );
}
export default DomainCard;
