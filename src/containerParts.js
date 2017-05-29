import moment from 'moment'
import withState from 'recompose/withState'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import compose from 'recompose/compose'
import {BUFFER, OVERSCAN} from './constants'
import weekToDate from './lib/weekToDate'
import prepareCalendarDays from './lib/prepareCalendarDays'
import layoutCalendarEvents from './lib/layoutCalendarEvents'
import groupByWeek from './lib/groupByWeek'

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

// maintain state of currently requested events and adjust window when the render range is updated
export const eventBuffer = compose(
  withState('bufferRange', 'setBufferRange', ({renderRange}) => ({
    start: renderRange.start - BUFFER,
    stop: renderRange.stop + BUFFER
  })),
  withHandlers({
    setRenderRange: (props) => (range) => {
      props.setRenderRange(range)
      if (props.bufferRange.start > range.start || props.bufferRange.stop < range.stop) {
        const bufferRange = {start: range.start - BUFFER, stop: range.stop + BUFFER}
        props.setBufferRange(bufferRange)
        props.onLoadEvents({
          start: weekToDate(props.min, bufferRange.start).format('YYYY-MM-DD'),
          stop: weekToDate(props.min, bufferRange.stop, true).format('YYYY-MM-DD')
        })
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.onLoadEvents({
        start: weekToDate(this.props.min, this.props.bufferRange.start).format('YYYY-MM-DD'),
        stop: weekToDate(this.props.min, this.props.bufferRange.stop, true).format('YYYY-MM-DD')
      })
    }
  })
)

export const calcWeeks = withProps(({events, renderRange, min}) => ({
  renderWeeks: groupByWeek(layoutCalendarEvents(prepareCalendarDays(
    events,
    moment(min).add(renderRange.start, 'week'),
    7 * (renderRange.stop - renderRange.start))))
}))
