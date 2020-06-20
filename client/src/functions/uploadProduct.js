import axios from "axios"

const uploadProduct = (data, push) => {
  axios.post("/api/product/uploadProduct", data).then((response) => {
    if (response.data.success) {
      alert("Product successfully updated")
      push("/")
    } else {
      alert("Failed to upload image")
    }
  })
}

export default uploadProduct
