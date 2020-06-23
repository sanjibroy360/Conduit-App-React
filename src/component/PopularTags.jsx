import React from "react";

function PopularTags(props) {
  return (
    <div className="taglist_wrapper">
      <div className="taglist_card">
        <h3 className="taglist_heading">Popular Tags</h3>
        <ul className="taglist">
          {props.tags.map((tag) => {
            return (
              <li>
                <button className="taglist_btn" onClick={(event) => props.handleClick(tag, event)}>{tag}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PopularTags;
