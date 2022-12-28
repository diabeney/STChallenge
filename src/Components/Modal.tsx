import { PostProps } from "../Utils/Utilities";
import CreatePost from "./CreatePost";
import { CreatePostProps } from "./CreatePost";

interface ModalProps {
  addPost: (post: PostProps) => void;
  post: PostProps;
  isEdit: boolean;
  buttonResponse: (res: "yes" | "cancel") => void;
}

type EditContentProps = Required<CreatePostProps>;

const DeleteContent = () => {
  return (
    <>
      <h2 className="modal__content--title">Delete post?</h2>
      <p className="modal__content--message">
        Are you sure you want to delete this post? This action cannot be
        reversed.
      </p>
    </>
  );
};

const EditContent = ({ addPost, existingPost }: EditContentProps) => {
  return <CreatePost addPost={addPost} existingPost={existingPost} />;
};

export default function Modal({
  addPost,
  post,
  buttonResponse,
  isEdit,
}: ModalProps) {
  return (
    <div className="modal__wrapper">
      <div className="modal__content">
        {isEdit ? (
          <EditContent addPost={addPost} existingPost={post} />
        ) : (
          <DeleteContent />
        )}
        <section className="modal__content--btns">
          <button
            style={{ display: isEdit ? "none" : "block" }}
            className="btn edit"
            onClick={() => buttonResponse("yes")}
          >
            Yes
          </button>
          <button
            className="btn cancel"
            onClick={() => buttonResponse("cancel")}
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}
