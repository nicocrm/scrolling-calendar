import PropTypes from 'prop-types'
import eventShape from './eventShape'
import moment from 'moment'

export default PropTypes.shape({
  date: PropTypes.instanceOf(moment),
  events: PropTypes.arrayOf(eventShape).isRequired
})
