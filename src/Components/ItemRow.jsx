import React from "react";
import { useInvoice } from "../Context/InvoiceContext";

const ItemRow = ({ item }) => {
  const { dispatch } = useInvoice();

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE_ITEM",
      payload: {
        id: item.id,
        field: name,
        value:
          name === "description"
            ? value
            : Number(value) || 0,
      },
    });
  };

  return (
    <tr className="border-t">

      <td className="p-3">
        <input
          type="text"
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Item description"
          className="w-full px-3 py-2 border rounded-lg"
        />
      </td>

      <td className="p-3">
        <input
          type="number"
          name="quantity"
          min="1"
          value={item.quantity}
          onChange={handleChange}
          className="w-24 px-3 py-2 border rounded-lg"
        />
      </td>

      <td className="p-3">
        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          value={item.price}
          onChange={handleChange}
          className="w-32 px-3 py-2 border rounded-lg"
        />
      </td>

      <td className="p-3 font-semibold">
        $
        {(
          Number(item.quantity) *
          Number(item.price)
        ).toFixed(2)}
      </td>

      <td className="p-3 text-center">
        <button
          onClick={() =>
            dispatch({
              type: "DELETE_ITEM",
              payload: { id: item.id },
            })
          }
          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          Delete
        </button>
      </td>

    </tr>
  );
};

export default ItemRow;