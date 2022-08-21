import styles from './contact-form.module.css';

const ContactForm = () => {
  return (
    <section className={styles.contact}>
      <h1 className={styles.title}>Contact me</h1>
      <form>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor='email' className={styles.label}>Your Email</label>
            <input className={styles.input} type='email' id='email' required />
          </div>
          <div className={styles.control}>
            <label htmlFor='name' className={styles.label}>Your Name</label>
            <input className={styles.input} type='text' id='name' required />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor='message' className={styles.label}>Your Message</label>
          <textarea className={styles.input} id='message' rows='5'></textarea>
        </div>

        <div className={styles.actions}>
          <button className={styles.button}>Send Message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
