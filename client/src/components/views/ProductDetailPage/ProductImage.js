import React, { useEffect, useState } from "react"
import { arrayOf, string, shape } from "prop-types"
import ImageGallery from "react-image-gallery"

export default function ProductImage({ detail: { images } }) {
  const [productImages, setProductImages] = useState([])

  useEffect(() => {
    if (images && images.length > 0) {
      let productImgs = []

      images.map((img) => {
        const imgUrl = `http://localhost:5000/${img}`
        return productImgs.push({
          original: imgUrl,
          thumbnail: imgUrl
        })
      })

      setProductImages(productImgs)
    }
  }, [images])

  return (
    <div>
      <ImageGallery items={productImages} />
    </div>
  )
}

ProductImage.propTypes = {
  detail: shape({
    images: arrayOf(string)
  })
}
