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
      deletePost(element!, "yes"); //asserting non-null, element cannot be null here.
      navigate("/");
    }
    toggleShowModal();
  };

  if (!element) return <p>An error occurred</p>;
  return (
    <>
      <button onClick={() => navigate(-1)} className="btn back ">
        <RiArrowLeftLine size={16} />
        Back
      </button>
      <div className="viewpost__wrapper">
        <p>{element.post}</p>
        <div>
          <section className="timestamp">
            <div>{element.timestamp}</div>
            <span className="edittag">{element.edited ? "Edited" : null}</span>
          </section>
          <section className="viewpost__btns-container flex ">
            <button
              onClick={() => {
                setCanEdit(true);
                toggleShowModal();
              }}
              className="btn add"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setCanEdit(false);
                toggleShowModal();
              }}
              className="btn delete "
            >
              Delete
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
