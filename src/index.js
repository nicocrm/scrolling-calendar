import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import defaultProps from 'recompose/defaultProps'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import moment from 'moment'
import {initialWeek, renderRange, eventBuffer, calcWeeks} from './containerParts'

// pass as string, javascript date objects, or moment objects
const datePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.object])

export default compose(
  setDisplayName('WeekCal'),
  setPropTypes({
    // min/max define the scroll range
    min: datePropType,
    max: datePropType,
    // where to start the calendar at
    initialDate: datePropType,
    // function({start: string, end: string}) used to provide new events data
    onLoadEvents: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        start: datePropType,
        end: datePropType,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired,
  }),
  defaultProps({
    min: moment().add(-5, 'year'),
    max: moment().add(10, 'year'),
    initialDate: moment().startOf('isoWeek')
  }),
  initialWeek, renderRange, eventBuffer, calcWeeks
)(Calendar)