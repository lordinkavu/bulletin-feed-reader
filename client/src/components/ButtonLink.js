import {Link} from 'react-router-dom';
function ButtonLink(props) {
  let theming =
    props.type === "primary"
      ? "text-white from-purple-500 to-indigo-500 bg-gradient-to-r"
      : "text-purple-500  border border-purple-500";

  return (
    <Link to={props.url}>
    <button
      className={` px-4 py-2 text-xs md:text-sm font-semibold  flex items-center justify-center   ${theming}`}
    >
      {props.name}
    </button>
    </Link>
  );
}

export default ButtonLink;
