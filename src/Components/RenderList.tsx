import { PostProps } from "../Utils/Utilities";
import { Link } from "react-router-dom";
type ListProps = {
  data: PostProps[];
  renderEmpty?: JSX.Element;
};

function RenderList({ data, renderEmpty }: ListProps) {
  if (renderEmpty) return renderEmpty;
  return (
    <ul className="posts__container">
      {data.map((item) => {
        return (
          <Link to={item.id} key={item.id} className="post__item">
            <li>{item.post}</li>
          </Link>
        );
      })}
    </ul>
  );
}

export default RenderList;
