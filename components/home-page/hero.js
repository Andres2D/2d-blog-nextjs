import Image from 'next/image';
import Link from 'next/link';
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
      <section className={styles.links}>
        <div>
          <Link href='https://github.com/Andres2D'>
            <a className={styles.link}>
              <Image 
                className={styles.icon}
                src='/images/site/github-icon.webp'
                alt='github profile'
                width={40}
                height={40}
              />
            </a>
          </Link>
          <Link href='https://andres-alcaraz.netlify.app/'>
            <a className={styles.link}>
              <Image 
                className={styles.icon}
                src='/images/site/computer-page.png'
                alt='personal web page'
                width={40}
                height={40}
              />
            </a>
          </Link>
        </div>
        <div>
          <Link href='https://www.facebook.com/andres.alcaraz.794'>
            <a className={styles.link}>
              <Image 
                className={styles.icon}
                src='/images/site/facebook.svg'
                alt='Facebook'
                width={40}
                height={40}
              />
            </a>
          </Link>
          <Link href='https://www.instagram.com/andres.2d/'>
            <a className={styles.link}>
              <Image 
                className={styles.icon}
                src='/images/site/instagram_icon.webp'
                alt='instagram'
                width={40}
                height={40}
              />
            </a>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Hero;
