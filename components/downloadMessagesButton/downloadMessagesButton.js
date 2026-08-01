"use client";
import React from 'react';

const DownloadCsvButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/messages/csv');
      if (!response.ok) {
        throw new Error('Errore nel download del file CSV');
      }
      const blob = await response.blob();

      // Creazione del link per il download del file
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'messages.csv');
      document.body.appendChild(link);
      link.click();

      // Pulizia del link e dell'URL creato
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleDownload}>Scarica CSV</button>
  );
};

export default DownloadCsvButton;
