import React, { useState } from "react";
//import axios from "axios";
import DomainBoard from "./DomainBoard";
import ArticleList from "./ArticleList";
function Body() {
  const [activeDomain, setActiveDomain] = useState("technology");
  const [articles, setArticles] = useState(null);
  /* useEffect(() => {
    async function fetchdata() {
      try {
        const res = await axios.get("articles/" + activeDomain);
        setArticles(res.data.articles);
      } catch (e) {
        console.log(e);
      }
    }
    //fetchdata();
  }, [activeDomain]); */

  return (
    <React.Fragment>
    <section className="flex justify-center">
     
        {" "}
        <DomainBoard
          setActiveDomain={setActiveDomain}
          activeDomain={activeDomain}
        />

      </section>
    <section>
    { articles!==null && <ArticleList articles={articles} />}
      </section>
   
    </React.Fragment>
  );
}
export default Body;
