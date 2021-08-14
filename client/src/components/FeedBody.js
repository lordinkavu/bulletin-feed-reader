import { useEffect, useState } from "react";
import axios from "axios";
//import { userContext } from "../Context";

import ArticleList from "./ArticleList";

export default function FeedBody(props) {
  //const user = JSON.parse(useContext(userContext).user);
  //const [isLoading, setIsLoading] = useState(true);

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function fetchDomainArticles() {
      try {
        const { data: articles } = await axios.get(
          "/articles",{
            params:{
              domain:props.selectedDomain
            }
          }
        );
        setArticles(Array.from(articles));
      } catch (e) {
        console.log(e);
      }
    }
    if (props.selectedDomain) fetchDomainArticles();
  }, [props.selectedDomain]);

  /* useEffect(() => {
    async function fetchdata() {
      try {
        const { data: articles } = await axios.get(`user/feed/all`);
        setArticles(articles);
        //setIsLoading(false);
        
      } catch (e) {
        console.log(e);
      }
    }
    if(props.user) fetchdata();
  }, [props.user]) */ if (articles.length === 0) {
    return <div></div>;
  } else {
    return (
      <div className="md:mx-8 flex-grow">
        <ArticleList articles={articles} />
      </div>
    );
  }
}
