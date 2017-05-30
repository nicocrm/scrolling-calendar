import PropTypes from 'prop-types'
import datePropType from './datePropType'

export default PropTypes.shape({
  start: datePropType.isRequired,
  end: datePropType.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
})
