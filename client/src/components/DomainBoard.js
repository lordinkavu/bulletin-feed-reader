import DomainCard from './DomainCard'
function DomainBoard(props) {
  const domain_list = [
    "technology",
    "business",
    "opinions",
    "insightful",
    "comic",
    "news",
  ];
  return (
    <div className="flex flex-wrap  mt-4">
      {domain_list.map((domain) => (
        <DomainCard name={domain} key={domain} setActiveDomain={props.setActiveDomain} activeDomain={props.activeDomain} />
      ))}
    </div>
  );
}
export default DomainBoard;
