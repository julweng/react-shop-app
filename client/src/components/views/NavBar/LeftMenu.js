import React from "react"
import { Menu } from "antd"

const { Item } = Menu

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Item key="home">
        <a href="/">Home</a>
      </Item>
    </Menu>
  )
}

export default LeftMenu
