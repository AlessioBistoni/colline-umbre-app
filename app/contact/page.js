'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from './Contacts.module.css';

// Carica la mappa solo sul client-side
const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false,
});

const teamMembers = [
  {
    name: "Billeri Simone",
    role: "Co-Founder",
    email: "simone@cantineumbre.com",
    phone: "+39 123 456 789",
    linkedin: "https://www.instagram.com/francescoforse_/",
    twitter: "https://x.com/Simone_Billeri",
  },
  {
    name: "Alessio Bistoni",
    role: "Co-Founder",
    email: "alessio@cantineumbre.com",
    phone: "+39 987 654 321",
    linkedin: "https://www.instagram.com/marcomagari_/",
    twitter: "https://x.com/BistoniAlessio",
  },
];

export default function Contacts() {
  const [mapInitialized, setMapInitialized] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.message) {
      setFormError('All fields are required');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormError(error.message);
    }
  };

  useEffect(() => {
    // Inizializza la mappa solo se non è stata già inizializzata
    if (!mapInitialized) {
      setMapInitialized(true);
    }
  }, [mapInitialized]);

  const socialIconStyles = {
    transition: 'transform 0.3s ease',
  };

  const socialIconHoverStyles = {
    transform: 'scale(1.2)',
  };

  return (
    <div className={styles.container}>
      <div className={styles.contactDetails}>
        <div className={styles.contactDetail}>
          <img src="/icon/telefono.png" alt="Telefono" className={styles.contactIcon} />
          <p>Telefono</p>
          <p>123 4567890</p>
        </div>
        <div className={styles.contactDetail}>
          <img src="/icon/mail.png" alt="Email" className={styles.contactIcon} />
          <p>Email</p>
          <p><a href="mailto:info@cantineumbre.it">info@cantineumbre.it</a></p>
        </div>
        <div className={styles.contactDetail}>
          <img src="/icon/contatti.png" alt="Assistenza E-commerce" className={styles.contactIcon} />
          <p>Assistenza E-commerce</p>
          <p><a href="mailto:help@cantineumbre.it">help@cantineumbre.it</a></p>
        </div>
        <div className={styles.contactDetail}>
          <img src="/icon/indirizzo.png" alt="Indirizzo" className={styles.contactIcon} />
          <p>Indirizzo</p>
          <p>Via Luigi Vanvitelli, 1 - 06123 <br />Perugia (PG)</p>
        </div>
      </div>
      <div className={styles.mapContainer}>
        {mapInitialized && <MapComponent />}
      </div>
      <div className={styles.schedeContatti}>
        <div>
          <h1>Il nostro team</h1>
        </div>
        <div className={styles.members}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={styles.card}
            >
              <h1>{member.name}</h1>
              <h2>{member.role}</h2>
              <p>Email: <a href={`mailto:${member.email}`}>{member.email}</a></p>
              <p>Telefono: <a href={`tel:${member.phone}`}>{member.phone}</a></p>
              <div className={styles.social}>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon}
                >
                  <img 
                    src="/icon/instagram.svg" 
                    alt="Instagram" 
                    width={24} 
                    height={24} 
                    style={socialIconStyles}
                    onMouseOver={(e) => e.currentTarget.style.transform = socialIconHoverStyles.transform}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                  />
                </a>
                <a 
                  href={member.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="/icon/twitter.svg" 
                    alt="Twitter" 
                    width={24} 
                    height={24} 
                    style={socialIconStyles}
                    onMouseOver={(e) => e.currentTarget.style.transform = socialIconHoverStyles.transform}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>Contattaci per richiedere informazioni</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Nome e Cognome"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          class
          Name={styles.input}
          name="message"
          placeholder="Messaggio"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <div className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" required />
            <span> Acconsento al trattamento dei miei dati personali ai sensi degli artt. 13 e 14 GDPR (Reg. UE 679/2016).</span>
          </label>
        </div>
        {formError && <p className={styles.error}>{formError}</p>}
        <button className={styles.button} type="submit">Invia</button>
      </form>
    </div>
  );
}
