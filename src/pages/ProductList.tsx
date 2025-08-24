import { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { useLoaderData } from 'react-router-dom';



function ProductList() {

  const filterInputRef = useRef<HTMLInputElement>(null);

  const products = useLoaderData() as Product[]

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterClick = () => {
    const codeValue = filterInputRef.current?.value;

    if (codeValue === "") {
      setFilteredProducts(products);
    } else {
      const codeNumber = Number(codeValue);
      const filtered = products.filter(product => product.id === codeNumber);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="product-list-container">
      <h1>Lista de Produtos</h1>
      <div className="filter-container">
        <label htmlFor="filterCode">Código</label>
        <input
          id="filterCode"
          type="text"
          ref={filterInputRef}
        />
        <button onClick={handleFilterClick}>Filtrar</button>
      </div>

      <div className="products-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
