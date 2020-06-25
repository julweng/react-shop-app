import React from "react"
import { string } from "prop-types"
import { Menu } from "antd"

const { Item } = Menu

function LeftMenu({ mode }) {
  return (
    <Menu mode={mode}>
      <Item key="home">
        <a href="/">Home</a>
      </Item>
    </Menu>
  )
}

LeftMenu.propTypes = {
  mode: string
}

export default LeftMenu
