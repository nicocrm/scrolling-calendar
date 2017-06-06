import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import eventShape from '../proptypes/eventShape'
import Event from './Event'
import styles from './Day.css'

const Day = ({isPast, isCurrentMonth, isToday, events, date, onEventClick, eventRenderer}) =>
  <li className={getDayClass({isPast, isCurrentMonth, isToday})}>
    {events.length ? renderDayEvents(events, date) : renderDateText(date)}
  </li>

const renderDateText = (date) =>
  <span className='date'>{date.format('MMM D')}</span>

const renderDayEvents = (events, date, onEventClick, eventRenderer) =>
  <section className='dateWrapper'>
    {renderDateText(date)}
    {events.map(ev => <Event key={ev.id} event={ev} onEventClick={onEventClick} eventRenderer={eventRenderer} />)}
  </section>

const getDayClass = ({isPast, isCurrentMonth, isToday}) => {
  let cls = styles.day + ' day'
  if (isPast)
    cls += ' past'
  if (isToday)
    cls += ' today'
  if (isCurrentMonth)
    cls += ' current'
  return cls
}

Day.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  events: PropTypes.arrayOf(eventShape).isRequired,
  isPast: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  isCurrentMonth: PropTypes.bool.isRequired,
  eventRenderer: PropTypes.func,
  onEventClick: PropTypes.func
}
export default Day
