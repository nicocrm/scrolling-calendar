import PropTypes from 'prop-types'
import moment from 'moment'

// pass as string, javascript date objects, or moment objects
export default PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(moment),
  PropTypes.instanceOf(Date)
])
