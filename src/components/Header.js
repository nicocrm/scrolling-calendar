import React from 'react'
import styled from 'styled-components'

const Week = styled.section`
  display: flex;
  span {
    flex: 1;
  }
`

const Header = ({month}) =>
  <section className='header'>
    <section className='month-name'>
      <h2>{month.format('MMMM YYYY')}</h2>
    </section>
    <Week className='week'>
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </Week>
  </section>

export default Header
