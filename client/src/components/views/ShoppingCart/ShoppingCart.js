import React, { useEffect, useState } from "react"
import { arrayOf, shape } from "prop-types"
import { useDispatch } from "react-redux"
import { Result, Empty } from "antd"
import { getCartItems, removeCartItem } from "../../../_actions/user_actions"
import UserCardBlock from "./UserCardBlock"

export default function ShoppingCart({ user: { userData, cartDetail } }) {
  const dispatch = useDispatch()

  const [totalPrice, setTotalPrice] = useState(0)
  const [showTotal, setShowTotal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  useEffect(() => {
    let cartItems = []
    if (userData && userData.cart) {
      if (userData.cart.length > 0) {
        userData.cart.forEach((item) => {
          cartItems.push(item.id)
        })
        dispatch(getCartItems(cartItems, userData.cart)).then((res) => {
          if (res.payload.length > 0) {
            calculateTotal(res.payload)
          }
        })
      }
    }
  }, [userData])

  const calculateTotal = (cartDetail) => {
    let total = 0
    cartDetail.forEach(
      (item) => parseInt((total += item.price)) * item.quantity
    )
    setShowTotal(true)
    setTotalPrice(total)
  }

  const removeFromCart = (id) => {
    dispatch(removeCartItem(id)).then((res) => {
      if (res.payload.cartDetail.length <= 0) {
        setShowTotal(false)
      } else {
        calculateTotal(res.payload.cartDetail)
      }
    })
  }

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={cartDetail}
          handleRemoveItem={removeFromCart}
        />

        {showTotal && (
          <div style={{ marginTop: "3rem" }}>
            <h2>Total amount: ${totalPrice}</h2>
          </div>
        )}
        {showSuccess && (
          <Result status="success" title="Successfully Purchased Items" />
        )}
        {!showTotal && !showSuccess && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items in the Cart</p>
          </div>
        )}
      </div>
    </div>
  )
}

ShoppingCart.propTypes = {
  cartDetail: shape({}),
  userData: shape({
    cart: arrayOf(shape({}))
  })
}
