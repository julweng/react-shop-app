import axios from "axios"

const uploadImage = async (data, config) => {
  const res = await axios.post("/api/product/uploadImage", data, config)

  if (res.data.success) {
    return res.data
  } else {
    alert("Failed to save the image in server")
  }
}

export default uploadImage
