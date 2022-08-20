import Image from 'next/image';
import styles from './post-header.module.css'

const PostHeader = (props) => {
  const { title, image } = props;
  
  return (
    <header className={styles.header}> 
      <h1 className={styles.title}>{title}</h1>
      <Image 
        className={styles.image}
        src={image} 
        alt={title} 
        width={200} 
        height={150} 
      />
    </header>
  )
};

export default PostHeader;
