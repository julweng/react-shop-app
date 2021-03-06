/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { func, shape, string } from "prop-types"
import { Badge, Menu } from "antd"
import { ShoppingCartOutlined, UploadOutlined } from "@ant-design/icons"
import { withRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import { logout } from "../../../functions"
import "./RightMenu.css"

const { Item } = Menu

function RightMenu({ mode, history }) {
  const user = useSelector((state) => state.user)

  const logoutHandler = async () => {
    const res = await logout()
    if (res.success) history.push("/login")
  }

  let count = 0
  if (user.userData && user.userData.cart && user.userData.cart.length) {
    user.userData.cart.forEach((item) => (count += item.quantity))
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={mode}>
        <Item key="mail">
          <a href="/login">Sign in</a>
        </Item>
        <Item key="app">
          <a href="/register">Sign up</a>
        </Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={mode}>
        <Item key="history">
          <a href="/history">History</a>
        </Item>
        <Item key="upload">
          <a href="/product/upload">
            <UploadOutlined style={{ fontSize: 20, marginBottom: 4 }} />
          </a>
        </Item>
        <Item key="cart">
          <Badge count={count}>
            <a href="/user/cart">
              <ShoppingCartOutlined style={{ fontSize: 20, marginBottom: 4 }} />
            </a>
          </Badge>
        </Item>
        <Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Item>
      </Menu>
    )
  }
}

RightMenu.propTypes = {
  history: shape({
    push: func
  }),
  mode: string
}

export default withRouter(RightMenu)
