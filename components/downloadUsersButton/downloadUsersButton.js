import React from 'react';

const DownloadUsersButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/csv');
      if (!response.ok) {
        throw new Error('Errore durante il download del CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Errore durante il download del CSV:', error.message);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleDownload}>
      Scarica CSV
    </button>
  );
};

export default DownloadUsersButton;