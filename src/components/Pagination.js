import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
`

const Pagination = ({ paginate }) => {
  const pageNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  return (
    <nav>
      <ul className='pagination'>
        {pageNumber.map((number) => (
          <li key={number} className='page-item'>
            <StyledDiv onClick={() => paginate(number)} className='page-link'>
              {number}
            </StyledDiv>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
