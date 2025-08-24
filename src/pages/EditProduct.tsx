import { Form, useNavigate, useLoaderData } from "react-router-dom";
import React, { useState } from 'react';


function EditProduct() {
  
  const navigate = useNavigate();

  const product = useLoaderData() as Product;

  const [formData, setFormData] = useState<Product>(product);

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/products');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="edit-product-container">
      <Form method="post" className="edit-product-form" id="editProductForm">

        <input type="hidden" name="id" value={formData.id} />

        <label>Nome:</label>
        <input name="name" type="text" value={formData.name} onChange={handleChange} />

        <label>Descrição:</label>
        <input name="description" type="text" value={formData.description} onChange={handleChange} />

        <label>Categoria:</label>
        <input name="category" type="text" value={formData.category} onChange={handleChange} />

        <label>Preço:</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} />

        <label>URL da Imagem:</label>
        <input name="pictureUrl" type="text" value={formData.pictureUrl} onChange={handleChange} />

        <div>
          <button type="submit" form="editProductForm">Editar</button>
          <button form="editProductForm" onClick={handleCancel}>Cancelar</button>
        </div>
      </Form>
    </div>
  );
}

export default EditProduct;