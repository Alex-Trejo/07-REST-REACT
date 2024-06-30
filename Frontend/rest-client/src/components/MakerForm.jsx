import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/MakerForm.css'; // Ajusta la importación según sea necesario

const MakerForm = () => {
  const [makers, setMakers] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [editingMaker, setEditingMaker] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMakers();
  }, []);

  const fetchMakers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/maker/findAll'); // Ajusta la URL según tu API
      setMakers(response.data);
    } catch (error) {
      console.error('Error fetching makers:', error);
      setError('Failed to fetch makers');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingMaker) {
        // Actualización de fabricante
        await axios.put(`http://localhost:8080/api/maker/update/${editingMaker.id}`, { name, country });
        alert('Maker updated successfully!');
      } else {
        // Creación de nuevo fabricante
        await axios.post('http://localhost:8080/api/maker/save', { name, country });
        alert('Maker created successfully!');
      }
      setName('');
      setCountry('');
      setEditingMaker(null);
      fetchMakers(); // Actualiza la lista de fabricantes después de la creación o actualización
    } catch (error) {
      console.error('Error creating/updating maker:', error);
      setError('Failed to create/update maker');
    }
};

const handleEdit = (maker) => {
    setEditingMaker(maker);
    setName(maker.name);
    setCountry(maker.country);
};

const handleDelete = async (id) => {
    try {
    await axios.delete(`http://localhost:8080/api/maker/delete/${id}`);
    alert('Maker deleted successfully!');
      fetchMakers(); // Actualiza la lista de fabricantes después de la eliminación
    } catch (error) {
    console.error('Error deleting maker:', error);
    setError('Failed to delete maker');
    }
};

return (
    <div>
    <form onSubmit={handleSubmit}>
        <h2>{editingMaker ? 'Edit Maker' : 'Create Maker'}</h2>
        <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
        Country:
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </label>
        <button type="submit">{editingMaker ? 'Update' : 'Create'}</button>
        {editingMaker && <button type="button" onClick={() => setEditingMaker(null)}>Cancel</button>}
    </form>
    
    
    <h2>Makers</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <ul>
        {makers.map((maker) => (
        <li key={maker.id}>
            {maker.name} - {maker.country}
            <button onClick={() => handleDelete(maker.id)}>Delete</button>
            <button onClick={() => handleEdit(maker)}>Edit</button>
        </li>
        ))}
    </ul>
    
    </div>
);
};

export default MakerForm;
