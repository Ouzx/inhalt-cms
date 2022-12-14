import CreateNewButton from "../Navbar/CreateNewButton";
import Pagination from "./Pagination";
import PostBox from "./Post/PostBox";

import { Post as PostType, PostQueryResult } from "../../redux/types";
import LoadIngdicator from "../LoadIngdicator";

const ITEMS_PER_PAGE = 5;

interface PostsProps {
  postQueryResult: PostQueryResult;
  pageNum: number;
  title: string;
  route: string;
}

const Posts = (props: PostsProps) => {
  let content;
  if (props.postQueryResult.isLoading) {
    content = <LoadIngdicator />;
  } else if (props.postQueryResult.isError) {
    content = <div className="dark:text-white">Something went wrong</div>;
  } else {
    if (props.postQueryResult.data.totalItems === 0) {
      content = (
        <div className="space-y-9">
          <p className="dark:text-white">Nothing found! Create new Instead:</p>
          <CreateNewButton />
        </div>
      );
    } else {
      content = (
        <div className="flex flex-col space-y-9">
          {props.postQueryResult.data?.posts?.map((post: PostType) => (
            <PostBox key={post._id} post={post} />
          ))}
          {props.postQueryResult.data.totalItems >= ITEMS_PER_PAGE && (
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              dataLength={props.postQueryResult.data.totalItems}
              forcePage={props.pageNum}
              route={props.route}
            />
          )}
        </div>
      );
    }
  }

  return (
    <div className="flex items-center justify-center mb-32">
      <div className="flex flex-col flex-1 justify-start max-w-2xl bg-gray-100 dark:bg-dblack dark:border-white dark:border p-6 pb-12">
        <p className="text-2xl mb-12 dark:text-white">{props.title}</p>
        {content}
      </div>
    </div>
  );
};

export default Posts;
