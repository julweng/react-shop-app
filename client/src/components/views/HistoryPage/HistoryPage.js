import React, { useEffect, useState } from "react"
import moment from "moment"
import { getHistory } from "../../../functions"
import "./HistoryPage.css"

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
    <div className="History__Container">
      <div className="History__Title">
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
            <tr key={item.paymentId}>
              <td>{item.id}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{moment(item.dateOfPurchase).format("MM-DD-YYYY hh:mm:ss")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
