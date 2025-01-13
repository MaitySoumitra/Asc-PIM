import { useEffect, useState } from 'react';
import { Table, FormControl, InputGroup, FormCheck } from 'react-bootstrap';
import './InventoryCollection.css'; // Import the external CSS file
import MonthlyChart from './MonthlyChart';


const InventoryCollection = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('inventoryData')) || [
      {
        location: "Warehouse A",
        sku: "ABC123",
        basePrice: 100,
        price: 120,
        totalStock: 500,
        available: 200,
        imageUrl: "", // Image URL for this product
      },
      {
        location: "Warehouse B",
        sku: "XYZ456",
        basePrice: 150,
        price: 180,
        totalStock: 300,
        available: 150,
        imageUrl: "https://via.placeholder.com/100", // Image URL for this product
      }
    ];
    setInventoryData(data);
  }, []);

  const handleTotalStockChange = (index, value) => {
    const updatedData = [...inventoryData];
    updatedData[index].totalStock = value;
    setInventoryData(updatedData);
    localStorage.setItem('inventoryData', JSON.stringify(updatedData));
  };

  const handleAvailableChange = (index, value) => {
    const updatedData = [...inventoryData];
    updatedData[index].available = value;
    setInventoryData(updatedData);
    localStorage.setItem('inventoryData', JSON.stringify(updatedData));
  };

  const handlePriceChange = (index, value) => {
    const updatedData = [...inventoryData];
    updatedData[index].price = value;
    setInventoryData(updatedData);
    localStorage.setItem('inventoryData', JSON.stringify(updatedData));
  };

  const handleBasePriceChange = (index, value) => {
    const updatedData = [...inventoryData];
    updatedData[index].basePrice = value;
    setInventoryData(updatedData);
    localStorage.setItem('inventoryData', JSON.stringify(updatedData));
  };

  const handleSelectProduct = (sku) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(sku)) {
        return prevSelected.filter((productSku) => productSku !== sku);
      } else {
        return [...prevSelected, sku];
      }
    });
  };

  const filteredData = inventoryData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.location.toLowerCase().includes(query) ||
      item.totalStock.toString().includes(query) ||
      item.available.toString().includes(query) ||
      item.sku.toLowerCase().includes(query) ||
      item.price.toString().includes(query) ||
      item.basePrice.toString().includes(query)
    );
  });

  return (
    <div className="inventory-container">
      <div className="header">
        <p>Inventory </p>
        <InputGroup className="search-bar">
          <FormControl
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>
      <div>
      <MonthlyChart/>
      </div>
      
      <Table striped bordered hover responsive className="inventory-table">
        <thead>
          <tr>
            <th>Select</th> 
            <th></th> 
            <th>Product</th>
            <th>SKU</th>
            <th>Base Price</th>
            <th>Price</th>
            <th>Total Stock</th>
            <th>Available</th>
            <th>Remaining Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>
                  <FormCheck
                    type="checkbox"
                    checked={selectedProducts.includes(item.sku)}
                    onChange={() => handleSelectProduct(item.sku)}
                  />
                </td>
                <td>
                  {/* Show the product image or default logo */}
                  <img 
                    src={item.imageUrl || "https://via.placeholder.com/100"} 
                    alt={item.sku} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                  />
                </td>
                <td>{item.location}</td>
                <td>{item.sku}</td>
                <td>
                  <FormControl
                    type="number"
                    value={item.basePrice}
                    onChange={(e) => handleBasePriceChange(index, e.target.value)}
                    className="input-field"
                  />
                </td>
                <td>
                  <FormControl
                    type="number"
                    value={item.price}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    className="input-field"
                  />
                </td>
                <td>
                  <FormControl
                    type="number"
                    value={item.totalStock}
                    onChange={(e) => handleTotalStockChange(index, e.target.value)}
                    className="input-field"
                  />
                </td>
                <td>
                  <FormControl
                    type="number"
                    value={item.available}
                    onChange={(e) => handleAvailableChange(index, e.target.value)}
                    className="input-field"
                  />
                </td>
                <td>{item.totalStock - item.available}</td> {/* Remaining Stock */}
              </tr>
            ))
          )}
        </tbody>
      </Table>

      
    </div>
  );
};

export default InventoryCollection;
