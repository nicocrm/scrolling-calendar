import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import eventShape from '../proptypes/eventShape'
import Event from './Event'

const dayStyle = props => Object.assign({
  position: 'relative',
  flex: '1'
}, props.isPast && {opacity: '0.3'})

const dateWrapperStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'visible',
}

const dateTextStyle = {
  display: 'block',
  padding: '4px'
}

const Day = ({isPast, isCurrentMonth, isToday, events, date, onEventClick, eventRenderer}) =>
  <li style={dayStyle({isPast})} className={getDayClass({isPast, isCurrentMonth, isToday})}>
    {events.length ? renderDayEvents(events, date) : renderDateText(date)}
  </li>

const renderDateText = (date) =>
  <span style={dateTextStyle} className='date'>{date.format('MMM D')}</span>

const renderDayEvents = (events, date, onEventClick, eventRenderer) =>
  <div style={dateWrapperStyle}>
    {renderDateText(date)}
    {events.map(ev => <Event key={ev.id} event={ev} onEventClick={onEventClick} eventRenderer={eventRenderer} />)}
  </div>

const getDayClass = ({isPast, isCurrentMonth, isToday}) => {
  let cls = 'day'
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
