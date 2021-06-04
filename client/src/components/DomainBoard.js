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
    <div class="flex flex-wrap  mt-4">
      {domain_list.map((domain) => (
        <DomainCard name={domain} setActiveDomain={props.setActiveDomain} />
      ))}
    </div>
  );
}
export default DomainBoard;
