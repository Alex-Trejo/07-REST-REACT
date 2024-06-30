import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import MakerForm from './components/MakerForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product and Maker Management</h1>
      </header>
      <main className="App-main">
        <section>
          <ProductForm />
          <ProductList />
        </section>
        <section>
          <MakerForm />
        </section>
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Product and Maker Management App- REST Karla Ansatuña - Trejo Alex</p>
      </footer>
    </div>
  );
}

export default App;
