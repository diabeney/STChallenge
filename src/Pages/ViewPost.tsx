import { PostProps } from "../Utils/Utilities";
import { RiArrowLeftLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { useState } from "react";
import useRouterHooks from "../hooks/useRouterHooks";

type ViewPostProps = {
  posts: PostProps[];
  deletePost: (post: PostProps, action: "yes") => void;
  addPost: (post: PostProps) => void;
};

function ViewPost({ posts, deletePost, addPost }: ViewPostProps) {
  const [showModal, setShowModal] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const { element, navigate } = useRouterHooks(posts);

  const toggleShowModal = () => {
    setShowModal((isShown) => !isShown);
  };

  const handleButtonResponse = (res: "yes" | "cancel") => {
    if (res === "yes") {
      deletePost(element!, "yes"); //asserting non-null, element cannot be null.
      navigate("/");
    }
    toggleShowModal();
  };

  if (!element) return <p>An error occurred</p>;
  return (
    <>
      <div>
        <button onClick={() => navigate(-1)}>
          <RiArrowLeftLine size={26} />
          Back
        </button>
        <h1>{element.post}</h1>
        <div>
          <section>
            <div>{element.timestamp}</div>
          </section>
          <section>
            <button
              onClick={() => {
                setCanEdit(false);
                toggleShowModal();
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setCanEdit(true);
                toggleShowModal();
              }}
            >
              Edit
            </button>
          </section>
        </div>
      </div>
      {showModal && (
        <Modal
          addPost={addPost}
          post={element}
          buttonResponse={handleButtonResponse}
          isEdit={canEdit}
        />
      )}
    </>
  );
}

export default ViewPost;
