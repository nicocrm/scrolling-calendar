import React from 'react'
import PropTypes from 'prop-types'
import {withHandlers} from 'recompose'
import {BASE_PADDING} from '../constants'
import eventShape from '../proptypes/eventShape'

const eventStyle = event => ({
  position: 'absolute',
  display: 'block',
  padding: '2px',
  zIndex: 1,
  overflow: 'hidden',
  height: `${event.expanded ? 23 : 2}px`,
  top: `${event.position + BASE_PADDING}px`,
  width: `${(event.lengthInWeek - 1) * 100 + 96}%`,
})
const eventInnerStyle = {
  borderRadius: '2px',
  backgroundColor: 'green',
  backgroundClip: 'border-box'
}
const eventTitleStyle = {
  margin: '0'
}

const Event = ({event, eventRenderer, onEventClick}) =>
  // multidayholder
  // change the class when the event gets hovered?
  // I removed that part because it causes rendering issues, especially on Safari (desktop)
  // console.log('render event ' + event.id)
  // but it needs to update for all days of that event, so that needs to be done at calendar level
  // const cls = (event.id === this.state.expanded) ? getHolderClass({expanded: true, offset: event.offset}) : getHolderClass(event)

  // only register the handlers when they apply
  // const onMouseOut = (event.id === this.state.expanded) ? () => this.onEventMouseOut(event.id) : null
  // const onMouseOver = (event.id !== this.state.expanded) ? () => this.onEventMouseOver(event.id) : null
  <div className={getHolderClass(event)} key={event.id}
      style={eventStyle(event)}
       onClick={onEventClick}>
    <div style={eventInnerStyle} className='event-inner'>
      {React.createElement(eventRenderer || DefaultEventRenderer, {event})}
    </div>
  </div>

Event.propTypes = {
  event: eventShape.isRequired,
  eventRenderer: PropTypes.func,
  onEventClick: PropTypes.func
}

// bind onEventClick with event
const handlers = withHandlers({
  'onEventClick': ({event, onEventClick}) => () => onEventClick && onEventClick({event})
})

const DefaultEventRenderer = ({event}) =>
  <p style={eventTitleStyle} className='event-title'>{event.title}</p>

const getHolderClass = event => {
  let cls = 'event'
  if (event.expanded)
    cls += ' expanded'
  else
    cls += ' contracted'
  if (event.offset)
    cls += ' offset-' + event.offset
  if (event.lengthInWeek)
    cls += ' length-' + event.lengthInWeek
  if (event.className)
    cls += ' ' + event.className
  return cls
}

export default handlers(Event)
