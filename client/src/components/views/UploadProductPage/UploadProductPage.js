import React, { useState } from "react"
import { func, string, shape } from "prop-types"
import { Typography, Button, Form, Input } from "antd"
import { FileUpload } from "../../utils"
import { uploadProduct } from "../../../functions"
import { continentOptions as Continents } from "../constants"
import "./UploadProductPage.css"

const { Title } = Typography
const { TextArea } = Input

export default function UploadProductPage({ user, history: { push } }) {
  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const [price, setPrice] = useState(0)

  const [continent, setContinent] = useState(1)

  const [images, setImages] = useState([])

  const onTitleChange = (ev) => {
    setTitle(ev.target.value)
  }

  const onDescriptionChange = (ev) => {
    setDescription(ev.target.value)
  }

  const onPriceChange = (ev) => {
    setPrice(ev.target.value)
  }

  const onContinentChange = (ev) => {
    setContinent(ev.target.value)
  }

  const updateImages = (newImages) => {
    setImages(newImages)
  }

  const onSubmit = async (ev) => {
    if (!title || !description || !price || !images || !continent) {
      return alert('Fill all fields.')
    }

    ev.preventDefault()
    const data = {
      writer: user.userData._id,
      title,
      description,
      price,
      images,
      continents: continent
    }

    const res = await uploadProduct(data)
    if (res.success) push("/")
  }

  return (
    <div className="Upload__Product__Container">
      <div className="Upload__Product__Title">
        <Title level={2}>UPload Travel Product</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={description} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={price} type="number" />
        <select onChange={onContinentChange}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  )
}

UploadProductPage.propTypes = {
  user: shape({
    userData: shape({
      _id: string
    }),
    history: shape({
      push: func
    })
  })
}
