import React, { Fragment, useState } from 'react'
import { Checkbox, Collapse } from "antd"
import { func } from "prop-types"
import { continentFilter } from "../constants"

const { Panel } = Collapse

export default function CheckBox({ handleFilters }) {
  const [checked, setChecked] = useState([])
  
  const handleToggle = (id) => {
    const currentIndex = checked.indexOf(id)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(id)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
    handleFilters(newChecked)
  }

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Continents" key="1">
          {continentFilter.map(c => (
            <Fragment key={c._id}>
              <Checkbox
                type="checkbox"
                checked={checked.indexOf(c._id) !== -1}
                onChange={() => handleToggle(c._id)}
              />
              <span>{c.name}</span>
            </Fragment>
          ))}
        </Panel>
      </Collapse>
    </div>
  )
}

CheckBox.propTypes = {
  handleFilters: func
} 
