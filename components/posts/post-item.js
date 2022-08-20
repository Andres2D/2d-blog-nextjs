import Image from 'next/image';
import Link from 'next/link';
import styles from './post-item.module.css';

const PostItem = (props) => {
  const {
    title,
    date,
    excerpt,
    image,
    slug
  } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={styles.post}>
      <Link href={linkPath}>
        <a className={styles.link}>
          <div className={styles.container}>
            <Image 
              className={styles.image} 
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout='responsive'
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <time className={styles.time}>{formattedDate}</time>
            <p className={styles.description}>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
