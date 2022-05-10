import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  useEffect(() => {
    fetchFirst();
  });
  const fetchMoreData = async () => {
    props.setProgress(10);
    setPage(page + 1);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ad4a53791e64826b66b5583ea13be61&page=${props.page}&pageSize=${props.pageSize}`;
    console.log('More:', url)
    setLoading({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(articles.concat(parsedData.articles));
    // setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    // });
    // set
    setTotalResults(parsedData.totalResults);
    setLoading({ loading: false });
    // setState({ totalResults: parsedData.totalResults, loading: false });
    props.setProgress(100);
  };

  const fetchFirst = async () => {
    props.setProgress(10);
    setPage(1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ad4a53791e64826b66b5583ea13be61&page=${page}&pageSize=${props.pageSize}`;
    setLoading({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log('First parsedData:',parsedData)
    setLoading({ loading: false });
    setArticles(parsedData.articles);
    console.log('First Articles:',articles)
    props.setProgress(70);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
    
    console.log('First:', url)
  };

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{ margin: "35px 0px" }}>
        News Monkey - Top Headlines Today....
      </h2>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length <= totalResults}
        loader={
          <h4>
            <Spinner />
          </h4>
        }
      >
        <div className="container">
          <div className="row">
            {/* {!this.state.loading && */}
            {articles.map((element, index) => {
              return (
                <div className="col-md-4 my-2" key={element.url + index}>
                  {/* {console.log(element.author)} */}
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    newsurl={element.url}
                    imageurl={element.urlToImage}
                    author={element.author}
                    publishedAt={element.publishedAt}
                  ></NewsItem>
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};
News.defaultProps = { country: "in", pageSize: 9, category: "general" };
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
