import React from "react";
import { Link } from "react-router-dom";

function ArticleList(props) {
  return (
    <div className="article_list_wrapper">
      <ul className="list_nav">
        {props.isLoggedIn ? (
          <>
            <li>
              <button
                onClick={(event) => props.handleClick("yourFeed", event)}
                className="active_filter article_list_btn your_feed_btn"
              >
                Your Feed
              </button>
            </li>
            <li>
              <button
                onClick={(event) => props.handleClick("all", event)}
                className="article_list_btn all_btn"
              >
                Global Feed
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={(event) => props.handleClick("all", event)}
              className="active_filter article_list_btn all_btn"
            >
              Global Feed
            </button>
          </li>
        )}
        <li>
          {props.filtered !== "all" && props.filtered !== "yourFeed" ? (
            <button
              className="article_list_btn active_filter filter_btn"
              onClick={(event) => props.handleClick(props.filtered, event)}
            >
              # {props.filtered}
            </button>
          ) : (
            ""
          )}
        </li>
      </ul>
      <ul>
        {props.articles.map((article) => {
          return (
            // <Link to={`/article/${article.slug}`}>
              <li className="article_card">
                <div className="article_card_left">
                  <div className="article_info">
                    <div className="author_image">
                      <img src={article.author.image} alt="User" />
                    </div>
                    <div>
                      <p className="author_name">
                        <Link
                          to={`/user/profile/${article.author.username}`}
                          className="author_name"
                          onClick={() =>
                            props.handleProfileVisit(article.author.username)
                          }
                        >
                          {article.author.username}
                        </Link>
                      </p>
                      <p className="create_date">
                        {article.createdAt
                          .toString()
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join(" / ")}
                      </p>
                    </div>
                  </div>

                  <div className="article_content">
                    <h3 className="article_title">{article.title || ""}</h3>
                    <p className="article_desc">{article.description || ""}</p>
                  </div>
                </div>

                <div className="article_card_right">
                  {article.favorited ? (
                    <button
                      className="favorited"
                      onClick={(event) =>
                        props.handleFavorited(
                          event,
                          article.slug,
                          article.favorited
                        )
                      }
                    >
                      {article.favoritesCount}
                    </button>
                  ) : (
                    <button
                      onClick={(event) =>
                        props.handleFavorited(
                          event,
                          article.slug,
                          article.favorited
                        )
                      }
                    >
                      {article.favoritesCount}
                    </button>
                  )}
                </div>

                <div className="card_footer">
                  <p>
                    <Link to={`/article/${article.slug}`} className="read_more">
                      {" "}
                      Read More...
                    </Link>
                  </p>
                  <ul className="card_taglist">
                    {article.tagList.length
                      ? article.tagList.map((tag) => {
                          return <li className="article_card_tag">{tag}</li>;
                        })
                      : ""}
                  </ul>
                </div>
              </li>
            // </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default ArticleList;
