import React, { useState } from "react";
import PostsSearchForm from "./PostsSearchForm";
import PostTable from "./PostTable";

function Posts(): JSX.Element {
  const [posts, setPosts] = useState([]);

  const setPostHandler = (responseData: any) => {
    setPosts(responseData);
  };

  return (
    <>
      <PostsSearchForm posts={posts} setPostHandler={setPostHandler} />
      <PostTable tableData={posts} />
    </>
  );
}

export default Posts;
