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
      <RenderList data={data} />
    </div>
  );
}

export default Home;
