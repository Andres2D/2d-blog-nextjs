import Image from 'next/image';
import { getDateFromString } from '../../../helpers/date';
import { externalLoader } from '../../../helpers/loaders';
import styles from './post-footer.module.css'

const PostFooter = (props) => {
  const { author, image, repository, date } = props;

  const postDate = new Date(getDateFromString(date)).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <footer className={styles.details}> 
      <Image 
        src={image}
        className={styles.image}
        loader={externalLoader}
        alt={author} 
        width={70} 
        height={70}
        onClick={() => location.href = repository}
      />
      <div className={styles.reference}>
        <h1 className={styles.author}>{author}</h1>
        <time className={styles.date}>{postDate}</time>
      </div>
    </footer>
  )
};

export default PostFooter;
