import moment from 'moment'

/**
 * Convert a week index to a date, formatted as YYYY-MM-DD
 *
 * @param minDate Date to start count at (should be a Monday)
 * @param index Number of weeks
 * @param weekEnd Use end of week rather than start
 */
export default function weekToDate(minDate, index, weekEnd = false) {
  const week = moment(minDate).add(index, 'week')
  return (weekEnd ? week.endOf('isoWeek') : week.startOf('isoWeek'))
}