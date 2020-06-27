import React from "react";
import Loader from "./Loader.jsx";

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.match.params.slug,
      articleDetails : null
    };
  }

  handleInput = ({ target: { name, value } }) => {
    
    if(this.state.articleDetails) {
      var articleDetails = this.state.articleDetails;
      if (name !== "tagList") {
        articleDetails[name] = value
        this.setState({ articleDetails});
        console.log(articleDetails);
        } else {
          value = value.split(",").map(el => el.trim());
          articleDetails[name] = value
          this.setState({ articleDetails });
        }
    }
  };

  handleSubmit = (event) => {
    var url = `https://conduit.productionready.io/api/articles/${this.state.slug}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ article: this.state }),
    }).then((res) => {
      console.log({ res });
      console.log({ article: this.state });
      if (res.status === 200) {
        this.props.history.push(`/article/${this.state.slug}`);
      }
    });
  };

  componentDidMount() {
      var url = `https://conduit.productionready.io/api/articles/${this.state.slug}`
      
      fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "authorization": `Token ${localStorage.authToken}`
          }
      })
      .then(res => res.json())
      .then(({article})=> this.setState({articleDetails: article}))
  }

  render() {
    if(!this.state.articleDetails) {
        return <Loader />
    }

    let { description, title, tagList, body } = this.state.articleDetails;
    

    return (
      <div className="container">
        <div className="form_wrapper">
          <div className="form">
            {" "}
            {/*/api/users*/}
            <input
              type="text"
              placeholder="Article Title"
              className="form_input"
              onChange={this.handleInput}
              name="title"
              value={title}
              
            />
            <input
              type="text"
              placeholder="Description"
              className="form_input"
              onChange={this.handleInput}
              name="description"
              value={description}
            />
            <textarea
              name="body"
              onChange={this.handleInput}
              className="form_input"
              rows="10"
              placeholder="Content"
              value={body}
            ></textarea>
            <input
              type="text"
              placeholder="Tags"
              className="form_input"
              onChange={this.handleInput}
              name="tagList"
              value={tagList.join(", ")}
            />
            <div className="btn_wrapper">
              <input
                onClick={this.handleSubmit}
                type="submit"
                value="Publish"
                className="form_submit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditArticle;
