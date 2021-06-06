import ArticleCard from './ArticleCard'
function ArticleList(props){
    const articles = Array.from(props.articles);

    return(<div className="flex-col">
        {articles.map(article=>(<ArticleCard key={article._id.toString()} data={article}/>))}
  
    </div>)
}
export default ArticleList;