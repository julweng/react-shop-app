import React, { useState } from "react"
import { func } from "prop-types"
import { Collapse, Radio } from "antd"
import { priceFilter } from "../constants"

const { Panel } = Collapse

export default function RadioInput({ handleFilters }) {
  const [value, setValue] = useState("0")

  const handleChange = (ev) => {
    setValue(ev.target.value)
    handleFilters(ev.target.value)
  }

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={value}>
            {priceFilter.map((p) => (
              <Radio key={p._id} value={`${p._id}`}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  )
}

RadioInput.propTypes = {
  handleFilters: func
}
