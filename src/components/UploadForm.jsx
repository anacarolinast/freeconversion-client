import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [format, setFormat] = useState('mp4');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !email) {
      setMessage('Por favor, forneça um arquivo e um e-mail.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    formData.append('format', format);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Arquivo enviado com sucesso! A conversão está em andamento.');
    } catch (error) {
      console.error(error);
      setMessage('Erro ao enviar o arquivo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Conversão de Vídeo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file-upload">Escolha um arquivo:</label>
          <input
            type="file"
            id="file-upload"
            accept="video/*"
            onChange={handleFileChange} 
          />
          <label htmlFor="file-upload" className="custom-file-upload">
            Escolher arquivo
          </label>

          {file && <p>Arquivo selecionado: {file.name}</p>}
        </div>

        <div>
          <label>Seu e-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Informe seu e-mail"
            required
          />
        </div>

        <div>
          <label>Formato desejado:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="mp4">MP4</option>
            <option value="mp3">MOV</option>
            <option value="avi">WEBM</option>
            <option value="mov">FLV</option>
            <option value="mov">AIFF</option>
            <option value="mov">AVI</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
