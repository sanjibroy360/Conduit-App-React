import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        body: "",
      },
    };
  }

  handleInput = (event) => {
    this.setState({
      comment: {
        body: event.target.value,
      },
    });
  };

  handleSubmit = () => {
    var slug = this.props.slug;
    var url = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((comment) => {
        this.props.updateCommentList(comment);
        this.setState({
          comment: {
            body: "",
          },
        });
      });
  };

  render() {
    return (
      <div className="comment_form">
        <textarea
          name="comment"
          rows="10"
          placeholder="Write a Comment..."
          className="comment_textarea"
          onChange={this.handleInput}
          value={this.state.comment.body}
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

export default withRouter(Comment);
