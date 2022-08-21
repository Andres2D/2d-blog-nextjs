import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from '../../lib/post-util';

const PostDetailPage = (props) => {
  return (
    <PostContent post={props.post} />
  );
};

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;

  const post = getPostData(slug);

  return {
    props: {
      post
    },
    revalidate: 600
  };
};

export const getStaticPaths = () => {
  
  const pathsMap = getPostsFiles().map(file => file.replace(/\.md$/, ''))
  
  return {
    paths: pathsMap.map(slug => ({ params: { slug: slug}})),
    fallback: false
  };
};

export default PostDetailPage;
