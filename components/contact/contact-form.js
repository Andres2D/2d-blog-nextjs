import { useState } from 'react';
import styles from './contact-form.module.css';

const ContactForm = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = (evt) => {
    evt.preventDefault();

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        email,
        name,
        message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <section className={styles.contact}>
      <h1 className={styles.title}>Contact me</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor='email' className={styles.label}>Your Email</label>
            <input 
              className={styles.input} 
              type='email' 
              id='email'
              value={email} 
              onChange={(evt) => setEmail(evt.target.value)}
              required 
            />
          </div>
          <div className={styles.control}>
            <label htmlFor='name' className={styles.label}>Your Name</label>
            <input 
              className={styles.input} 
              type='text' 
              id='name'
              value={name} 
              onChange={(evt) => setName(evt.target.value)}
              required 
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor='message' className={styles.label}>Your Message</label>
          <textarea 
            className={styles.input} 
            id='message' 
            rows='5'
            value={message}
            onChange={(evt) => setMessage(evt.target.value)}
            required
          ></textarea>
        </div>

        <div className={styles.actions}>
          <button type='submit' className={styles.button}>Send Message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
