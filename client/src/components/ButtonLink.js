function ButtonLink(props) {
  let theming =
    props.type === "primary"
      ? "text-white from-purple-500 to-indigo-500 bg-gradient-to-r"
      : "text-purple-500  border-2 border-purple-500";

  return (
    <button
      className={` px-4 text-xs md:text-sm font-semibold  flex items-center justify-center   ${theming}`}
    >
      <a href={props.url}>{props.name}</a>
    </button>
  );
}

export default ButtonLink;
