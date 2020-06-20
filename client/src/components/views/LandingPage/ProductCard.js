import React from "react"
import { arrayOf, number, shape, string } from "prop-types"
import { Card } from "antd"
import { ImageSlider } from "../../utils"

const { Meta } = Card

export default function ProductCard({ product: { title, price, images } }) {
  return (
    <div>
      <Card hoverable cover={<ImageSlider title={title} images={images} />}>
        <Meta title={title} description={`$${price}`} />
      </Card>
    </div>
  )
}

ProductCard.propTypes = {
  product: shape({
    title: string,
    price: number,
    images: arrayOf(string)
  })
}
