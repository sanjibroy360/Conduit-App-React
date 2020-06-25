import React from "react";
import ArticleList from "./ArticleList.jsx";
import PopularTags from "./PopularTags.jsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      tags: null,
      filtered: "all",
    };
  }

  handleClick = (tagName, event) => {
    
    if (tagName != this.state.filtered) {

      var prevBtn = document.querySelector(".active_filter");
      // if (prevBtn && prevBtn.classList.contains("active_filter")) {
        prevBtn.classList.remove("active_filter");
      // }

      if (tagName !== "all") {
        fetch(
          `https://conduit.productionready.io/api/articles?tag=${tagName}&limit=10&offset=0`
        )
          .then((response) => response.json())
          .then((data) =>
            this.setState({ articles: data.articles, filtered: tagName })
          )
          .catch((error) => console.log(error));

        var filterBtn = document.querySelector(".filter_btn");
        if (filterBtn) {
          filterBtn.classList.add("active_filter");
        }
      } else {
        fetch(
          "https://conduit.productionready.io/api/articles?limit=10&offset=0"
        )
          .then((response) => response.json())
          .then((data) =>
            this.setState({ articles: data.articles, filtered: tagName })
          )
          .catch((error) => alert(error));

        var filterBtn = document.querySelector(".all_btn");
        filterBtn.classList.add("active_filter");
      }
    } else {
        return;
    }
  };

  componentDidMount() {
    var articles = fetch(
      "https://conduit.productionready.io/api/articles?limit=10&offset=0"
    )
      .then((response) => response.json())
      .then((data) => this.setState({ articles: data.articles }))
      .catch((error) => alert(error));

    var tags = fetch("https://conduit.productionready.io/api/tags")
      .then((response) => response.json())
      .then((data) => this.setState({ tags: data.tags }))
      .catch((error) => alert(error));
  }
  render() {
    return (
      <section className="article_sec">
        <div className="container">
          {this.state.articles && this.state.tags ? (
            <div className="home_content">
              <ArticleList
                articles={this.state.articles}
                filtered={this.state.filtered}
                handleClick={this.handleClick}
              />
              <PopularTags
                tags={this.state.tags}
                handleClick={this.handleClick}
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    );
  }
}

export default Home;
