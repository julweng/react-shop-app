import React, { useState } from "react"
import { func, number, shape } from "prop-types"
import { Typography, Button, Form, Input } from "antd"
import FileUpload from "../../utils/FileUpload"
import uploadProduct from "../../../functions/uploadProduct"

const { Title } = Typography
const { TextArea } = Input

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Antarctica" },
  { key: 3, value: "Asia" },
  { key: 4, value: "Australia" },
  { key: 5, value: "Europe" },
  { key: 6, value: "North America" },
  { key: 7, value: "South America" }
]

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

  const onSubmit = (ev) => {
    ev.preventDefault()
    const data = {
      writer: user.userData._id,
      title,
      description,
      price,
      images,
      continents: continent
    }

    uploadProduct(data, push)
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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
            <option key={item.key} value={continent}>
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
      _id: number
    }),
    history: shape({
      push: func
    })
  })
}
