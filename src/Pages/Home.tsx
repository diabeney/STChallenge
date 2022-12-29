import RenderList from "../Components/RenderList";
import { PostProps } from "../Utils/Utilities";
import CreatePost from "../Components/CreatePost";

type HomeProps = {
  data: PostProps[];
  addPost: (post: PostProps) => void;
};

function Home({ data, addPost }: HomeProps) {
  return (
    <div>
      <CreatePost addPost={addPost} />
      {data.length !== 0 && (
        <h3 style={{ paddingInline: ".8rem" }}>All Posts({data.length})</h3>
      )}
      <RenderList data={data} />
    </div>
  );
}

export default Home;
