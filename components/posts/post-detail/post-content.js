import PostHeader from './post-header';
import styles from './post-content.module.css';

const DUMMY_POST = {
  title: 'Getting Started with NextJS',
  slug: 'getting-started-with-next-js',
  image: 'getting-started-with-next-js.png',
  date: '2022-08-19',
  content: '# This is a first post'
};

const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={styles.content}>
      <PostHeader 
        title={DUMMY_POST.title} 
        image={imagePath}
      />
      {DUMMY_POST.content}
    </article>
  );
};

export default PostContent;
