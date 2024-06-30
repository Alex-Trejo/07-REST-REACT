import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importa Axios para hacer las peticiones HTTP
import '../assets/ProductList.css'; // Asegúrate de importar estilos si es necesario

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [makerId, setMakerId] = useState('');
  const [makers, setMakers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchMakers(); // Agrega la llamada para obtener la lista de fabricantes al cargar el componente
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/product/findAll');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    }
  };

  const fetchMakers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/maker/findAll'); // Ajusta la URL según tu endpoint de fabricantes
      setMakers(response.data);
    } catch (error) {
      console.error('Error fetching makers:', error);
      setError('Failed to fetch makers');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/product/delete/${id}`);
      alert('Product deleted successfully!');
      fetchProducts(); // Actualiza la lista de productos
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setName(product.name);
    setPrice(product.price);
    setMakerId(product.maker.id); // Establece el ID del fabricante seleccionado
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatedProduct = {
        id: editingProduct,
        name,
        price: parseFloat(price),
        maker: { id: makerId } // Envía el ID del fabricante seleccionado
      };
      await axios.put(`http://localhost:8080/api/product/update/${editingProduct}`, updatedProduct);
      alert('Product updated successfully!');
      setEditingProduct(null);
      setName('');
      setPrice('');
      setMakerId('');
      fetchProducts(); // Actualiza la lista de productos después de la actualización
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} - {product.maker.name}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            <button onClick={() => handleEdit(product)}>Edit</button>
          </li>
        ))}
      </ul>
      {editingProduct && (
        <form onSubmit={handleUpdate}>
          <h2>Edit Product</h2>
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
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ProductList;
