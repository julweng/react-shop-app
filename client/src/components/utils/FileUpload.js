import React, { useState } from "react"
import { func } from "prop-types"
import Dropzone from "react-dropzone"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import { uploadImage } from "../../functions"
import "./FileUpload.css"
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
    <div className="File__Upload__Container">
      <Dropzone onDrop={onDrop} multiple={false} maxSize={80000000}>
        {({ getRootProps, getInputProps }) => (
          <div className="Dropzone__Input__Container" {...getRootProps()}>
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div className="Dropzone__Image__Container">
        {images.map((image, index) => (
          <div key={image} className="DropZone__Minus__Icon__Container">
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
              className="Uploaded__Image"
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
