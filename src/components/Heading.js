import React, { useState } from 'react'
import styled from 'styled-components'

const Cover = styled.div`
  max-width: 70rem;
  margin: 2rem auto;
  text-align: center;
`

const Heading = (props) => {
  const [search, setSearch] = useState()

  const searchHandler = (event) => {
    setSearch(event.target.value)
  }
  const valueSetHandler = () => {
    props.onSearchClick(search)
  }

  return (
    <Cover>
      <div>
        <input type='text' onChange={searchHandler} />
        <button onClick={valueSetHandler}>Search</button>
      </div>
    </Cover>
  )
}

export default Heading
