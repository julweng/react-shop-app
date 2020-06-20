import React, { useState } from "react"
import { func } from "prop-types"
import Dropzone from "react-dropzone"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import { uploadImage } from "../../functions"

export default function FileUpload({ refreshFunction }) {
  const [images, setImages] = useState([])

  const onDrop = async (files) => {
    let formData = new FormData()

    const config = {
      header: { "content-type": "multipart/form-data" }
    }

    formData.append("file", files[0])

    // save image in node server
    const res = await uploadImage(formData, config)
    if (res.success) {
      setImages([...images, res.image])
    refreshFunction([...images, res.image])
    }
  }

  const onDelete = (index) => {
    let newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
    refreshFunction(newImages)
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={80000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll"
        }}
      >
        {images.map((image, index) => (
          <div key={image} style={{ position: "relative" }}>
            <MinusOutlined
              style={{
                fontSize: "3rem",
                position: "absolute",
                top: "40%",
                left: "43%"
              }}
              onClick={() => onDelete(index)}
            />
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
              alt={`productImg-${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

FileUpload.propTypes = {
  refreshFunction: func
}
