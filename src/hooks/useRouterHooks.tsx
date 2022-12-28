import { useNavigate, useLocation } from "react-router-dom";
import { PostProps } from "../Utils/Utilities";

function useRouterHooks<T extends PostProps[]>(data: T) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const element = data.find((item) => `/${item.id}` === pathname);
  return { element, navigate };
}

export default useRouterHooks;
