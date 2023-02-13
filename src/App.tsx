import { PostProps } from "./Utils/Utilities";
import { useState } from "react";
import { loadData, saveData } from "./Utils/Utilities";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ViewPost from "./Pages/ViewPost";
import { _GENERATED_IDS_ } from "./Utils/Utilities";

function App() {
  const [posts, setPosts] = useState(loadData("notely"));
  const navigate = useNavigate();

  const addNewPost = (post: PostProps) => {
    let updatedPosts;
    if (post.edited) {
      const filteredPost = [
        ...posts.map((item) => {
          if (item.id === post.id) {
            navigate("/");
            return {
              ...post,
              post: post.post,
            };
          }
          return item;
        }),
      ];
      updatedPosts = [...filteredPost];
    } else {
      updatedPosts = [...posts, post];
    }

    saveData("notely", updatedPosts);
    setPosts(updatedPosts);
  };

  const deletePost = (post: PostProps) => {
    const filteredPosts = posts.filter((oldposts) => oldposts.id !== post.id);
    saveData("notely", filteredPosts);
    setPosts(filteredPosts);
    navigate("/");
  };

  return (
    <>
      <h3 className="logo">Notely</h3>
      <Routes>
        <Route path="/" element={<Home data={posts} addPost={addNewPost} />} />
        <Route
          path="/:id"
          element={
            <ViewPost
              posts={posts}
              addPost={addNewPost}
              deletePost={deletePost}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
