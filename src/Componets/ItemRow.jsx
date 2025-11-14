import React from 'react';
import { useInvoice } from '../context/InvoiceContext';

const ItemRow = ({ item }) => {
  const { dispatch } = useInvoice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numeric inputs from string values to floats
    const parsedValue = (name === 'description') ? value : parseFloat(value) || 0; 

    dispatch({
      type: 'UPDATE_ITEM',
      payload: { 
        id: item.id, 
        field: name, 
        value: parsedValue,
      },
    });
  };

  return (
    <tr>
      {/* Input for Product Name/Description */}
      <td><input type="text" name="description" value={item.description} onChange={handleChange} /></td>
      
      {/* Input for Quantity */}
      <td><input type="number" name="quantity" value={item.quantity} onChange={handleChange} min="1" /></td>
      
      {/* Input for Price */}
      <td><input type="number" name="price" value={item.price} onChange={handleChange} step="0.01" /></td>
      
      {/* Auto-calculated line total (read-only) */}
      <td>{(item.quantity * item.price).toFixed(2)}</td>
      
      {/* Delete button */}
      <td><button onClick={() => dispatch({ type: 'DELETE_ITEM', payload: { id: item.id } })}>Delete</button></td>
    </tr>
  );
};

export default ItemRow;