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
            <div>
                <h1>Aggiungi un Vino</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Prezzo:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Anno:</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Descrizione Breve:</label>
                        <input
                            type="text"
                            name="short_description"
                            value={formData.short_description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Descrizione Lunga:</label>
                        <textarea
                            name="long_description"
                            value={formData.long_description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Immagine:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit">Aggiungi Vino</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </AdminLayout>
    );
};

export default AddWine;
