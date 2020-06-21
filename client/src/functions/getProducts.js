import axios from "axios"

const getProducts = async (data) => {
  const res = await axios.post("/api/product/getProducts", data)
  
  if (res.data.success) {
    return res.data
  } else {
    alert("Failed to fetch product data")
  }
}

export default getProducts
