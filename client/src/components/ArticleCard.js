function ArticleCard(props) {
  const data = props.data;
  return <div className="m-4 p-4 max-w-md border-b mx-auto ">
      <div className="text-sm">{data.source}</div>
      <a href={data.link.toString()} target="_blank" rel="noreferrer"> 
      <div className="font-bold">{data.title}</div>
      <div className="text-gray-500">{new Date(data.pubDate).toDateString()}</div>
      
      </a>

     
      </div>;
}
export default ArticleCard;
