import React from "react"
import { arrayOf, string } from "prop-types"
import { Carousel } from "antd"

export default function ImageSlider({ createdAt, images }) {
  return (
    <div>
      <Carousel autoplay>
        {images.map((img) => (
          <div key={`${img}_${createdAt}`}>
            <img
              src={`http://localhost:5000/${img}`}
              alt="productImage"
              style={{ width: "100%", height: "150px" }}
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
