import axios from "axios"

const getProducts = async () => {
  const res = await axios.post("/api/product/getProducts")
  if (res.data.success) {
    return res.data
  } else {
    alert("Failed to fetch product data")
  }
}

export default getProducts
