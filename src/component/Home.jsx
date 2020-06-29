import React from "react";
import ArticleList from "./ArticleList.jsx";
import PopularTags from "./PopularTags.jsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      tags: null,
      filtered: "",
    };
  }

  handleFavorited = (event, slug, isFavorited) => {
  
    alert(isFavorited)
    var url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
    var method;
    // var prevBtn = document.querySelector(".favorited");
    // if(prevBtn) {
    //   prevBtn.classList.remove("favorited");
    // }
    if (!isFavorited) {
      method = "POST";
      event.target.classList.add("favorited");

      
    } else {
      method = "DELETE";
      if(event.target.classList.contains("favorited")) {
        event.target.classList.remove("favorited");
      }
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({article}) => {
        var index = this.state.articles.findIndex(el => article.slug === el.slug);

        this.state.articles.map(el => console.log(el));
        

        var copyArr = this.state.articles.slice();
        console.log("###################################")
        console.log(copyArr[index], index, article);
        copyArr[index].favorited = article.favorited;
        copyArr[index].favoritesCount = article.favoritesCount;
        this.setState({articles: copyArr});

      });
  };

  handleClick = (tagName, event) => {
    if (tagName !== this.state.filtered) {
      var filterBtn;
      var prevBtn = document.querySelector(".active_filter");
      if (prevBtn) prevBtn.classList.remove("active_filter");

      if (tagName !== "all" && tagName !== "yourFeed") {
        fetch(
          `https://conduit.productionready.io/api/articles?tag=${tagName}&limit=10&offset=0`
        )
          .then((response) => response.json())
          .then((data) =>
            this.setState({ articles: data.articles, filtered: tagName })
          )
          .catch((error) => console.log(error));

        filterBtn = document.querySelector(".filter_btn");
        if (filterBtn) {
          filterBtn.classList.add("active_filter");
        }
      } else if (tagName === "all") {
        fetch(
          "https://conduit.productionready.io/api/articles?limit=10&offset=0"
        )
          .then((response) => response.json())
          .then((data) =>
            this.setState({ articles: data.articles, filtered: tagName })
          )
          .catch((error) => alert(error));

        filterBtn = document.querySelector(".all_btn");
        filterBtn.classList.add("active_filter");
      } else if (tagName === "yourFeed") {
        var url = `https://conduit.productionready.io/api/articles/feed?limit=10&offset=0`;

        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.authToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) =>
            this.setState({ articles: data.articles, filtered: tagName })
          )
          .catch((error) => alert(error));

        filterBtn = document.querySelector(".your_feed_btn");
        filterBtn.classList.add("active_filter");
      }
    } else {
      return;
    }
  };

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      fetch("https://conduit.productionready.io/api/articles?limit=10&offset=0")
        .then((response) => response.json())
        .then((data) =>
          this.setState({ articles: data.articles, filtered: "all" })
        )
        .catch((error) => alert(error));
    } else {
      fetch(
        `https://conduit.productionready.io/api/articles/feed?limit=10&offset=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({ articles: data.articles, filtered: "yourFeed" })
        )
        .catch((error) => alert(error));
    }
    fetch("https://conduit.productionready.io/api/tags")
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
                isLoggedIn={this.props.isLoggedIn}
                articles={this.state.articles}
                filtered={this.state.filtered}
                handleClick={this.handleClick}
                handleProfileVisit={this.props.handleProfileVisit}
                handleFavorited={this.handleFavorited}
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
