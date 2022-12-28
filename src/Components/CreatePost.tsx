import { useState, useEffect } from "react";
import { PostProps, id, createTimestamp } from "../Utils/Utilities";
export type CreatePostProps = {
  addPost: (value: PostProps) => void;
  existingPost?: PostProps; //using the same component to edit a post
};
function CreatePost({ addPost, existingPost }: CreatePostProps) {
  const [postValue, setPostValue] = useState("");

  const handleOnSubmit = () => {
    if (!postValue) return null;
    let updatedOrNewPost;
    if (existingPost) {
      updatedOrNewPost = {
        ...existingPost,
        edited: true,
      };
    } else {
      updatedOrNewPost = {
        id: id.next().value,
      };
    }
    updatedOrNewPost = {
      ...updatedOrNewPost,
      post: postValue,
      timestamp: createTimestamp(),
    };
    addPost(updatedOrNewPost);
    setPostValue("");
  };

  useEffect(() => {
    if (existingPost) setPostValue(existingPost.post + postValue);
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input
          value={postValue}
          type="text"
          onChange={(e) => setPostValue(e.target.value)}
        />
      </form>
      <section>
        <button onClick={() => handleOnSubmit()}>
          {existingPost ? "Save" : "Add Post"}
        </button>
      </section>
    </div>
  );
}

export default CreatePost;
