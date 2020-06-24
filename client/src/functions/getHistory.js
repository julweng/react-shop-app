import axios from "axios"

const getHistory = async () => {
  const res = await axios.get('/api/users/getHistory')
  if (res.data.success) {
    return res.data
  } else {
    alert('Failed to get history')
  }
}

export default getHistory