import React, { Component } from "react";

class Comment extends Component {
  render() {
    return (
      <div className="comment_form">
        <textarea
          name="comment"
          rows="10"
          placeholder="Write a Comment..."
          className="comment_textarea"
        ></textarea>
        <div className="comment_btn_wrapper">
          <input
            type="submit"
            value="Publish"
            className="comment_submit"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Comment;
