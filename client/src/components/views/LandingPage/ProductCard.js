import React from "react"
import { arrayOf, number, shape, string } from "prop-types"
import { Card } from "antd"
import { ImageSlider } from "../../utils"

const { Meta } = Card

export default function ProductCard({
  product: { _id, title, price, images, createdAt }
}) {
  return (
    <div>
      <Card
        hoverable
        cover={
          <a href={`/product/${_id}`}>
            <ImageSlider createdAt={createdAt} images={images} />
          </a>
        }
      >
        <Meta title={title} description={`$${price}`} />
      </Card>
    </div>
  )
}

ProductCard.propTypes = {
  product: shape({
    _id: string,
    createdAt: string,
    title: string,
    price: number,
    images: arrayOf(string)
  })
}
