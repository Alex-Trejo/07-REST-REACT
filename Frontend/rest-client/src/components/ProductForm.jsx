import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { productService, makerService } from '../services/apiService'; // Ajusta el import según tu estructura de archivos

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [makerId, setMakerId] = useState('');
  const [makers, setMakers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener la lista de fabricantes
    const fetchMakers = async () => {
      try {
        const response = await makerService.getAllMakers();
        setMakers(response.data);
      } catch (error) {
        console.error('Error fetching makers:', error);
      }
    };

    fetchMakers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await productService.createProduct({
        name: name,
        price: parseFloat(price),
        maker: { id: makerId }
      });

      console.log('Product created:', response.data);
      setName('');
      setPrice('');
      setMakerId('');
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product. Please check your input and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Maker:
        <select value={makerId} onChange={(e) => setMakerId(e.target.value)} required>
          <option value="">Select a maker</option>
          {makers.map((maker) => (
            <option key={maker.id} value={maker.id}>
              {maker.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default ProductForm;
