import axios from "axios"
import { USER_SERVER } from "../components/Config"

const logout = async () => {
  const res = await axios.get(`${USER_SERVER}/logout`)
  if (res.status === 200) {
    return res.data
  } else {
    alert("Log Out Failed")
  }
}

export default logout
