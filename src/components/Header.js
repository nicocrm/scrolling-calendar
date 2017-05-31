import React from 'react'
import styles from '../Calendar.pcss'

const Header = ({month}) =>
  <section className={styles.header}>
    <section className='month-name'>
      <h2>{month.format('MMMM YYYY')}</h2>
    </section>
    <section className='week'>
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
