import PostsGrid from './posts-grid';
import styles from './all-posts.module.css';

const AllPosts = (props) => {
  return (
    <section className={styles.posts}>
      <h1 className={styles.title}>All posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default AllPosts;
