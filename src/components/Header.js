import React from 'react'

const Header = ({month}) =>
  <section className='calendar-header'>
    <section className="month-name">
      <h2>{month.format('MMMM YYYY')}</h2>
    </section>
    <section className="weekdays">
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </section>
  </section>

export default Header
