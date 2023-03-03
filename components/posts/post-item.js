import Image from 'next/image';
import Link from 'next/link';
import styles from './post-item.module.css';

const PostItem = (props) => {
  const {
    title,
    date,
    excerpt,
    image,
    slug,
    technologies
  } = props.post;

  const postDate = new Date(date.slice(0, 4), date.slice(5, 7), date.slice(8, 10));

  const formattedDate = new Date(postDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;
  const techIcons = technologies.split(',');

  const technologiesIcons = techIcons.map(tech => {
    return (
      <div
        className={styles.iconTech}
        key={tech}
      >
        <Image 
          src={`/images/site/${tech}.svg`}
          title={tech}
          alt={tech}
          width={35}
          height={35}
        />
      </div>
    );
  }); 

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
          <div className={styles.techs}>
            { technologiesIcons }
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
