import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import axios from "axios";

class App extends React.Component {
  state = {
    title: "",
    description: "",
    posts: [],
  };

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    axios
      .get("/posts")
      .then((res) => {
        const data = res.data;
        this.setState({ posts: data });
        console.log("Data has been recieved");
      })
      .catch(() => {
        alert("Error");
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.title,
      description: this.state.description,
    };

    axios({
      url: "/posts/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        this.resetInputs();
        this.getPost();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  resetInputs = () => {
    this.setState({
      title: "",
      description: "",
    });
  };

  displayPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div className="single-post" key={index}>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
    ));
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h2>Chris-Code Post App</h2>
          <form className="form-horizontal" onSubmit={this.submit}>
            <div className="form-group form-inuput">
              <div className="col-sm-12">
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-input">
              <div className="col-sm-12">
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Description..."
                  cols="30"
                  rows="5"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>

          <div className="posts col-sm-8 offset-sm-2">
            <div className="blog-">{this.displayPost(this.state.posts)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
