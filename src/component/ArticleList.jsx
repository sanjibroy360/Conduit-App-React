import React from "react";

function ArticleList(props) {
  return (
    <div className="article_list_wrapper">
      <ul className="list_nav">
        <li>
          <button
            onClick={(event) => props.handleClick("all", event)}
            className="active_filter article_list_btn all_btn"
          >
            Global Feed
          </button>
        </li>
        <li>
          {props.filtered !== "all" ? (
            <button
              className="article_list_btn active_filter filter_btn"
              onClick={(event) => props.handleClick(props.filtered, event)}
          ># {props.filtered}</button>
          ) : (
            ""
          )}
        </li>
      </ul>
      <ul>
        {props.articles.map((article) => {
          return (
            <li className="article_card">
              <div className="article_card_left">
                <div className="article_info">
                  <div className="author_image">
                    <img src={article.author.image} />
                  </div>
                  <div>
                    <p className="author_name">
                      <a href="#" className="author_name">
                        {article.author.username}
                      </a>
                    </p>
                    <p className="create_date">{article.createdAt}</p>
                  </div>
                </div>

                <div className="article_content">
                  <h3 className="article_title">{article.title || ""}</h3>
                  <p className="article_desc">{article.description || ""}</p>
                </div>
              </div>

              <div className="article_card_right">
                <button>{article.favoritesCount}</button>
              </div>

              <div className="card_footer">
                <p>
                  <a href="#" className="read_more">
                    {" "}
                    Read More...
                  </a>
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
          );
        })}
      </ul>
    </div>
  );
}

export default ArticleList;
