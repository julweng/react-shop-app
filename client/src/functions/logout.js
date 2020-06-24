import axios from "axios"
import { USER_SERVER } from "../components/Config"

const logout = async () => {
  axios.get(`${USER_SERVER}/logout`).then((response) => {
    if (response.status === 200) {
      return response.data.success
    } else {
      alert("Log Out Failed")
    }
  })
}

export default logout
