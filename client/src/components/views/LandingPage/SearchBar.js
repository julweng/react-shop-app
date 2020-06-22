import React from "react"
import { func, string } from "prop-types"
import { Input } from "antd"

const { Search } = Input

export default function SearchBar({ searchTerm, refreshFunction }) {
  const onChangeSearch = (ev) => {
    refreshFunction(ev.target.value)
  }

  return (
    <div>
      <Search
        value={searchTerm}
        onChange={onChangeSearch}
        placeholder="Search By Typing..."
      />
    </div>
  )
}

SearchBar.propTypes = {
  refreshFunction: func,
  searchTerm: string
}
