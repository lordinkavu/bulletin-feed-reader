import React from "react";
function DomainCard(props) {
  let emoji, color;
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

  function setDomain() {
    props.setActiveDomain(props.name);
  }
  return (
    <div
      onClick={setDomain}
      className={`font-light px-4 py-1 text-sm md:text-base cursor-pointer m-2  ${
        props.name === props.activeDomain
          ? `text-white bg-${color}-500`
          : ` border-2 border-${color}-500`
      } `}
    >
      {props.name + " " + emoji}
    </div>
  );
}
export default DomainCard;
