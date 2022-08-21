import ReactDOM from 'react-dom';
import styles from './notification.module.css';

function Notification(props) {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{message}</p>
    </div>
  );
}

export default Notification;
