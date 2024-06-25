"use client"; // Questa riga è necessaria per utilizzare il client
import { useState } from 'react';
import AdminLayout from '../Layout/LayoutAdmin';
import styles from './AddWine.module.css';

const AddWine = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        year: '',
        type: '',
        short_description: '',
        long_description: '',
        image: null // Modificato per gestire il file immagine
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('year', formData.year);
        data.append('type', formData.type);
        data.append('short_description', formData.short_description);
        data.append('long_description', formData.long_description);
        data.append('image', formData.image);

        try {
            const response = await fetch('http://localhost:3001/api/wines', {
                method: 'POST',
                body: data
            });

            const result = await response.json();
            setMessage(result.message);
            setFormData({
                name: '',
                price: '',
                year: '',
                type: '',
                short_description: '',
                long_description: '',
                image: null
            });
        } catch (error) {
            console.error('Errore durante l\'aggiunta del vino:', error);
            setMessage('Errore durante l\'aggiunta del vino');
        }
    };

    return (
        <AdminLayout>
            <div className={styles.page}>
            <div className={styles.container}>
                <h1 className='mb-4'>Aggiungi un Vino</h1>
                <div className={styles.card}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="name"
                            maxLength={20}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label>Prezzo:</label>
                        <input
                            type="number"
                            name="price"
                            min={1}
                            max={1000}
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label>Anno:</label>
                        <input
                            type="number"
                            name="year"
                            min={1950}
                            max={2024}
                            value={formData.year}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <input
                            type="text"
                            name="type"
                            maxLength={20}
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label>Descrizione Breve:</label>
                        <input
                            type="text"
                            name="short_description"
                            maxLength={50}
                            value={formData.short_description}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label>Descrizione Lunga:</label>
                        <textarea
                            type="text"
                            maxLength={400}
                            name="long_description"
                            value={formData.long_description}
                            onChange={handleChange}
                            required
                            className={styles.descrizioneLunga}
                        />
                    </div>
                    <div>
                        <label>Immagine:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            required
                            className={styles.immagine}
                            accept=".jpg, .jpeg, .png" // Limita i tipi di file accettati
                        />
                    </div>
                    <button className='mt-3 btn btn-primary'type="submit">Aggiungi Vino</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            </div>
            </div>
        </AdminLayout>
    );
};

export default AddWine;
