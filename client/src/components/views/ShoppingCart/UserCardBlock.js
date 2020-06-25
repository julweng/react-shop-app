import React from "react"
import { arrayOf, func, number, shape, string } from "prop-types"

export default function UserCardBlock({ products, handleRemoveItem }) {
  const renderImage = (images) => {
    if (images.length) {
      return `http://localhost:5000/${images[0]}`
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    className="Product__Image"
                    alt="product"
                    src={renderImage(p.images)}
                  />
                </td>
                <td>{p.quantity} EA</td>
                <td>{p.price}</td>
                <td>
                  <button onClick={() => handleRemoveItem(p._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

UserCardBlock.propTypes = {
  handleRemoveItem: func,
  products: arrayOf(
    shape({
      quantity: number,
      price: number,
      _id: string,
      images: arrayOf(string)
    })
  )
}
