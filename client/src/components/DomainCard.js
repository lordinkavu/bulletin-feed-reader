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

  return (
    <div
      onClick={props.setActiveDomain(props.name)}
      class={`font-light px-4 py-1 text-base  m-2 border-2 border-${color}-500`}
    >
      {props.name + " " + emoji}
    </div>
  );
}
export default DomainCard;
