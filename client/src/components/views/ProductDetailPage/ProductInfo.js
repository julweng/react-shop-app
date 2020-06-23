import React from 'react'
import { number, shape, string } from "prop-types"
import { Button, Descriptions } from "antd"

const { Item } = Descriptions

export default function ProductInfo({ detail: { description, price, sold, views } }) {
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
      <div style={{ display: "flex", justifyContent: "center"}}>
          <Button size="large" shape="round" type="danger">
            Add to Cart
          </Button>
        </div>
    </div>
  )
}

ProductInfo.propTypes = {
  detail: shape({
    description: string,
    price: number,
    sold: number,
    views: number
  })
}