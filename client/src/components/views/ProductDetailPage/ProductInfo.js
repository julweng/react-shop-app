import React from "react"
import { func, number, shape, string } from "prop-types"
import { Button, Descriptions } from "antd"
import "./ProductInfo.css"

const { Item } = Descriptions

export default function ProductInfo({
  detail: { _id, description, price, sold, views },
  addToCart
}) {

  const handleAddToCart = () => {
    addToCart(_id)
  }

  return (
    <div>
      <Descriptions title="Product Info">
        <Item label="Price">{price}</Item>
        <Item label="Sold">{sold}</Item>
        <Item label="View">{views}</Item>
        <Item label="Description">{description}</Item>
        <br />
        <br />
        <br />
        <br />
      </Descriptions>
      <div className="AddToCart__Btn__Container">
        <Button size="large" shape="round" type="danger" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

ProductInfo.propTypes = {
  addToCart: func,
  detail: shape({
    _id: string,
    description: string,
    price: number,
    sold: number,
    views: number
  })
}
