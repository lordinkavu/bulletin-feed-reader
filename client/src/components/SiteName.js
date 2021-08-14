import axios from "axios";
import { Plus, Minus } from "react-feather";

export default function SiteName(props) {

  async function handleAddClick() {
    try {
      await axios.patch("/user/add/site/" + props._id);
      props.fetchSites();
    } catch (e) {
      console.log(e);
    }
  }
  
  async function handleRemoveClick() {
    try {
      await axios.patch("/user/remove/site/" + props._id);
      props.fetchSites();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex space-x-2 items-center">
      <div className="underline cursor-pointer">{props.site}</div>
      {user && user["site"][props._id] !== true && (
        <div onClick={handleAddClick} className="cursor-pointer">
          <Plus color="gray" size={18} />
        </div>
      )}
      {user && user["site"][props._id] === true && (
        <div onClick={handleRemoveClick} className="cursor-pointer">
          <Minus color="gray" size={18} />
        </div>
      )}
    </div>
  );
}
