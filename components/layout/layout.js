import MainNav from "./main-nav";
import styles from './layout.module.css';

const Layout = (props) => {
  return (
    <>
      <MainNav />
      <main className={styles.main}>{props.children}</main>
    </>
  );
}

export default Layout;
