import PropTypes from 'prop-types'
import moment from 'moment'
import withState from 'recompose/withState'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'
import defaultProps from 'recompose/defaultProps'
import compose from 'recompose/compose'
import {BUFFER, OVERSCAN} from './constants'
import weekToDate from './lib/weekToDate'
import prepareCalendarDays from './lib/prepareCalendarDays'
import layoutCalendarEvents from './lib/layoutCalendarEvents'
import groupByWeek from './lib/groupByWeek'

const propTypes = setPropTypes({
  // pass as string, javascript date objects, or moment objects
  min: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  max: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  initialDate: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  events: PropTypes.array.isRequired,
})

const defaults = defaultProps({
  min: moment().add(-5, 'year'),
  max: moment().add(10, 'year'),
  initialDate: moment().startOf('isoWeek')
})

// calculation of initial props
export const initialWeek = withProps(({min, max, initialDate}) => ({
  totalWeekCount: moment(max).diff(min, 'week'),
  initialWeekIndex: moment(initialDate).diff(min, 'week'),
  min: moment(min).startOf('isoWeek')
}))

// renderRange state and initial calculation
export const renderRange = withState('renderRange', 'setRenderRange', ({initialWeekIndex, visibleWeekCount}) => ({
  start: initialWeekIndex - OVERSCAN,
  stop: initialWeekIndex + visibleWeekCount + OVERSCAN
}))

// maintain state of currently requested events and adjust window as requested
export const eventBuffer = compose(
  withState('bufferRange', 'setBufferRange', ({renderRange}) => renderRange),
  withHandlers({
    setRenderRange: (props) => (range) => {
      props.setRenderRange(range)
      if (props.bufferRange.start > range.start || props.bufferRange.stop < range.stop) {
        props.setBufferRange({start: range.start - BUFFER, stop: range.stop + BUFFER})
        props.onLoadEvents({
          start: weekToDate(props.min, range.start - BUFFER),
          stop: weekToDate(props.min, range.stop + BUFFER, true)
        })
      }
    }
  })
)

export const calcWeeks = withProps(({events, renderRange, min}) => ({
  renderWeeks: groupByWeek(layoutCalendarEvents(prepareCalendarDays(
    events, min, 7 * (renderRange.stop - renderRange.start))))
}))

export default compose(
  propTypes, defaults, initialWeek, renderRange, eventBuffer
)