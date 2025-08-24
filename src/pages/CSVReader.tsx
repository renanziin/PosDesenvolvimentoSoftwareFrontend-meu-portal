import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

// Interface para os dados como vêm do arquivo CSV (tudo é string)
interface CsvData {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  pictureUrl: string;
}

const CSVReader: React.FC = () => {
  const [csvData, setCsvData] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [importedProducts, setImportedProducts] = useState<Product[]>([]);
  const [notImportedProducts, setNotImportedProducts] = useState<Product[]>([]);

  const API_URL = "http://localhost:3001/api/product";

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<CsvData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map(item => ({
            id: parseInt(item.id),
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            category: item.category,
            pictureUrl: item.pictureUrl
          }));
          setCsvData(parsedData);
        },
      });
    }
  };

  const handleCheckboxChange = (product: Product, isChecked: boolean) => {
    if (isChecked) {
      setSelectedProducts(prev => [...prev, product]);
    } else {
      setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
    }
  };

  const handleImport = async () => {
    const imported: Product[] = [];
    const notImported: Product[] = [];

    for (const product of selectedProducts) {
      try {
        // Remove o campo 'id' antes de enviar, já que o backend cria o próprio ID
        const { id, ...productData } = product;
        await axios.post(API_URL, productData);
        imported.push(product);
      } catch (error) {
        console.error(`Erro ao importar o produto ${product.name}:`, error);
        notImported.push(product);
      }
    }

    setImportedProducts(imported);
    setNotImportedProducts(notImported);
    setSelectedProducts([]); // Limpa a seleção
    setCsvData([]); // Limpa os dados originais do CSV
  };

  const hasPendingItems = csvData.length > 0;

  return (
    <div>
      <h3>Importar Arquivo CSV</h3>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />

      {hasPendingItems && (
        <div>
          <button
            onClick={handleImport}
            disabled={selectedProducts.length === 0}
          >
            Importar ({selectedProducts.length})
          </button>

          <h4>Dados do CSV:</h4>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>id</th>
                <th>pictureUrl</th>
                <th>name</th>
                <th>description</th>
                <th>price</th>
                <th>category</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={row.id || index}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(row, e.target.checked)}
                      checked={selectedProducts.some(p => p.id === row.id)}
                    />
                  </td>
                  <td>{row.id}</td>
                  <td>
                    <img src={row.pictureUrl} alt={row.name} style={{ width: '50px', height: '50px' }} />
                  </td>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>{row.price}</td>
                  <td>{row.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CSVReader;