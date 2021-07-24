import { useEffect, useContext, useState } from "react";
import axios from "axios";
//import { userContext } from "../Context";

import ArticleList from "./ArticleList";

function FeedBody() {
  //const user = JSON.parse(useContext(userContext).user);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      try {
        const { data: articles } = await axios.get(`user/feed/all`);
        setArticles(articles);
        setIsLoading(false);
        
      } catch (e) {
        console.log(e);
      }
    }
    fetchdata();
  }, []);
  if (isLoading) {
    return (
      <div className=" w-full flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-10 w-10"></div>
      </div>
    );
  } else if (articles.length === 0) {
    return <div>Nothing here :(</div>;
  } else {
    return(
      <div className='md:mx-8'>
        <ArticleList articles={articles}/>
      </div>
    )
    
  }
}
export default FeedBody;
