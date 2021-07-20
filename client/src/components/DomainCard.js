import React, { useContext } from "react";
import { userContext } from "../Context";
import axios from "axios";

function DomainCardButton({ handleAddClick, handleRemoveClick }) {
  return (
    <div
      className={` border border-purple-500 border-l-0 px-2 py-0.5 md:px-4 md:py-1 m-px ml-0 cursor-pointer`}
      onClick={() => handleAddClick()}
    >
      +
    </div>
  );
}

function DomainCard(props) {
  const user = JSON.parse(useContext(userContext).user);
  const { setUser } = useContext(userContext);

  async function handleAddClick() {
    try {
      const res = await axios.post(`/user/add/domain/${props.name}`);
      setUser(JSON.stringify(res.data));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveClick() {
    try {
      const res = await axios.post(`/user/remove/domain/${props.name}`);
      setUser(JSON.stringify(res.data));
    } catch (e) {
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
            ? `text-white bg-purple-500`
            : ` border-2 border-purple-500`
        } `}
      >
        {props.name}
      </div>
      {user !== null && (
        <DomainCardButton
          handleAddClick={handleAddClick}
          handleRemoveClick={handleRemoveClick}
        />
      )}
    </div>
  );
}
export default DomainCard;
