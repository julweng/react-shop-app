import axios from "axios"

const getProduct = async (productId) => {
  const res = await axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
  console.log(res)
  if (res.status === 200) {
    return res.data
  } else {
    alert("Failed to fetch product detail")
  }
}

export default getProduct