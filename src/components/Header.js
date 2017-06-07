import React from 'react'

const weekStyle = {
  display: 'flex'
}
const dayStyle = {
  flex: 1
}

const Day = (label) => <span style={dayStyle}>{label}</span>

const Header = ({month}) =>
  <section className='header'>
    <section className='month-name'>
      <h2>{month.format('MMMM YYYY')}</h2>
    </section>
    <section style={weekStyle} className='week'>
  {Day('Sun')}
  {Day('Mon')}
  {Day('Tue')}
  {Day('Wed')}
  {Day('Thu')}
  {Day('Fri')}
  {Day('Sat')}
    </section>
  </section>

export default Header
