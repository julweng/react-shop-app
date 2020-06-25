import React from "react"
import { arrayOf, string } from "prop-types"
import { Carousel } from "antd"
import "./ImageSlider.css"

export default function ImageSlider({ createdAt, images }) {
  return (
    <div>
      <Carousel autoplay>
        {images.map((img) => (
          <div key={`${img}_${createdAt}`}>
            <img
              className="ImageSlider__Image"
              src={`http://localhost:5000/${img}`}
              alt="productImage"
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

ImageSlider.propTypes = {
  title: string,
  images: arrayOf(string)
}
