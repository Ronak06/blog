import React from "react";
import PostList from "./PostList";
import "../css/App.css";

const App = () => {
  return (
    <div className="ui container">
      <h1>Blog Post</h1>
      <PostList />
    </div>
  );
};

export default App;
