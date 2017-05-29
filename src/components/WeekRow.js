import React from 'react'

const WeekRow = ({week, startOfWeek, style}) =>
  <div style={style}>
    Week of {startOfWeek.format('YYYY-MM-DD')}
  </div>

WeekRow.propTypes = {}

export default WeekRow
