import Link from 'next/link';
import Logo from './logo';
import styles from './main-nav.module.css';

const MainNav = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a className={styles.link}>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href='/posts'>
              <a className={styles.link}>Posts</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href='/contact'>
              <a className={styles.link}>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default MainNav;
