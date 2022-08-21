import { useState, useEffect } from 'react';
import Notification from '../ui/notification';
import styles from './contact-form.module.css';

const sendContactData = async({
  email,
  name,
  message
}) => {
  const response = await fetch('/api/contact', {
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

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || 'Something went wrong!' );
  }
};

const ContactForm = () => {

  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if(requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async(evt) => {
    evt.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData({
        email,
        name,
        message
      });
      setRequestStatus('success');
      setEmail('');
      setName('');
      setMessage('');
    }catch(error) {
      setRequestStatus('error');
      setRequestError(error.message);
    }
  };

  let notification;

  if(requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    }
  }
  
  if(requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!'
    }
  }
  
  if(requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: requestError
    }
  }

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
      {notification && (
        <Notification 
          status={notification.status} 
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
