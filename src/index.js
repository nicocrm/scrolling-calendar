import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import defaultProps from 'recompose/defaultProps'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import moment from 'moment'
import {initialWeek, renderRange, eventBuffer, calcWeeks, getCurrentMonth, calcUpdatedFlag} from './containerParts'
import datePropType from './proptypes/datePropType'
import eventShape from './proptypes/eventShape'
import defaultSizeCalculator from './lib/defaultSizeCalculator'

export default compose(
  setDisplayName('ScrollingCalendar'),
  setPropTypes({
    // min/max define the scroll range
    min: datePropType,
    max: datePropType,
    // where to start the calendar at
    initialDate: datePropType,
    // height of the scrolling container
    containerHeight: PropTypes.number.isRequired,
    visibleWeekCount: PropTypes.number,
    // function({start: string, end: string}) used to provide new events data
    onLoadEvents: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(
      eventShape
    ).isRequired,
    // today's date - defaults to today (duh) but can be changed to another day to simulate a different
    // day's calendar
    today: datePropType,
    onEventClick: PropTypes.func,
    // optional component creator used to render the inside of an event
    eventRenderer: PropTypes.func,
    sizeCalculator: PropTypes.func,
    className: PropTypes.string,
  }),
  defaultProps({
    min: moment().add(-5, 'year'),
    max: moment().add(10, 'year'),
    initialDate: moment().startOf('isoWeek'),
    visibleWeekCount: 4,
    today: moment(),
    sizeCalculator: defaultSizeCalculator,
    className: 'scrolling-calendar'
  }),
  initialWeek, renderRange, eventBuffer, calcWeeks, getCurrentMonth, calcUpdatedFlag
)(Calendar)
