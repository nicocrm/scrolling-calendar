import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import eventShape from '../proptypes/eventShape'
import Event from './Event'
import styled from 'styled-components'

.day {
  position: relative;
  flex: 1;
  &:global(.past) {
    opacity: 0.3;
  }
  &:global(.today) {

  }
  &:global(.current) {

  }
  :global(.dateWrapper) {
  }
}

const Li = styled.li`
  position: relative;
  flex: 1;
`

const DateWrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: visible;
`

const DateText = styled.span`
  display: block;
  padding: 4px;
`

const Day = ({isPast, isCurrentMonth, isToday, events, date, onEventClick, eventRenderer}) =>
  <li className={getDayClass({isPast, isCurrentMonth, isToday})}>
    {events.length ? renderDayEvents(events, date) : renderDateText(date)}
  </li>

const renderDateText = (date) =>
  <DateText className='date'>{date.format('MMM D')}</DateText>

const renderDayEvents = (events, date, onEventClick, eventRenderer) =>
  <DateWrapper>
    {renderDateText(date)}
    {events.map(ev => <Event key={ev.id} event={ev} onEventClick={onEventClick} eventRenderer={eventRenderer} />)}
  </DateWrapper>

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
