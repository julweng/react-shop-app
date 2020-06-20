import axios from "axios"

const uploadImage = (data, config, images, setImages, refresh) => {
  axios.post("/api/product/uploadImage", data, config).then((response) => {
    if (response.data.success) {
      console.log("success")
      setImages([...images, response.data.image])
      refresh([...images, response.data.image])
    } else {
      alert("Failed to save the image in server")
    }
  })
}

export default uploadImage
