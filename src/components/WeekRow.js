import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import dayShape from '../proptypes/dayShape'
import Day from './Day'

const weekRowStyle = {
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyle: 'none'
}

const WeekRow = ({week, today, currentMonth, style}) =>
  <ul style={weekRowStyle} className='week-row' style={style}>
    {week && week.map(day => <Day key={day.date} {...day}
                                  isToday={today.isSame(day.date, 'day')}
                                  isPast={today.isAfter(day.date, 'day')}
                                  isCurrentMonth={currentMonth.isSame(day.date, 'month')}/>)}
  </ul>

WeekRow.propTypes = {
  week: PropTypes.arrayOf(dayShape).isRequired,
  style: PropTypes.object.isRequired,
  // used to show today's date
  today: PropTypes.instanceOf(moment).isRequired,
  currentMonth: PropTypes.instanceOf(moment).isRequired
}

export default WeekRow
