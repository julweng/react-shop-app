import axios from "axios"

const uploadProduct = async (data) => {
  const res = await axios.post("/api/product/uploadProduct", data)
  if (res.data.success) {
    return res.data
  } else {
    alert("Failed to upload image")
  }
}

export default uploadProduct
