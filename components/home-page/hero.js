import Image from 'next/image';
import styles from './hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <Image 
          src='/images/site/2D-2.jpeg'
          alt='An image showing Andres'
          width={400}
          height={400}
        />
      </div>
      <h1 className={styles.title}>HI, I AM ANDRES</h1>
      <p className={styles.subtitle}>I blog about web development - specially frontend with Javascript</p>
    </section>
  );
};

export default Hero;
