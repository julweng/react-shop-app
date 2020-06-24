import React, { useEffect, useState } from "react"
import { getHistory } from "../../../functions"

export default function HistoryPage({ user: { userData } }) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getHistory()
      if (res.success) {
        setHistory(res.history)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.dateOfPurchase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
