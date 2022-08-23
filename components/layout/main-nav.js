import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './logo';
import styles from './main-nav.module.css';

const MainNav = () => {
  const { pathname } = useRouter();
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href='/posts'>
              <a 
                className={
                  `${styles.link}
                  ${pathname === '/posts' ? styles.activeLink : ''}`
                }
              >Posts</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href='/contact'>
              <a 
                className={
                  `${styles.link}
                  ${pathname === '/contact' ? styles.activeLink : ''}`
                }
              >Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default MainNav;
