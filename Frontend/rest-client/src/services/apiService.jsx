// apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Reemplaza con tu URL base

const apiService = axios.create({
baseURL: BASE_URL,
headers: {
    'Content-Type': 'application/json',
},
});

export const productService = {
getAllProducts: () => apiService.get('/product/findAll'),
getProductById: (id) => apiService.get(`/product/find/${id}`),
createProduct: (product) => apiService.post('/product/save', product),
updateProduct: (id, product) => apiService.put(`/product/update/${id}`, product),
deleteProduct: (id) => apiService.delete(`/product/delete/${id}`),
};

export const makerService = {
    getAllMakers: () => apiService.get('/maker/findAll'),
    getMakerById: (id) => apiService.get(`/maker/find/${id}`),
    createMaker: (maker) => apiService.post('/maker/save', maker),
    updateMaker: (id, maker) => apiService.put(`/maker/update/${id}`, maker),
    deleteMaker: (id) => apiService.delete(`/maker/delete/${id}`),
};
