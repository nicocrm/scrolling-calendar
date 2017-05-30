import moment from 'moment'

/**
 * Prepare the array of days that will be used to display events on the calendar.
 * Each event must have the properties:
 *  - start
 *  - end
 *  - title
 *  - id
 * They can also have an "expanded" property to indicate they should be expanded by default
 *
 * For each day, we need to have the  collection of events for that day, with indicators:
 *  - length in week (the # of days for that event)
 *  - first in week (indicates this is the first day for the event in the current week)
 *  - expanded (indicates that the item should be expanded by default)
 *  - offset (an optional positive offset for events that need to have an additional margin so that they don't overlap later ones)
 * The events must be sorted by date, then by stage
 */
export default function prepareCalendarDays(events, startDate, numDays) {
  const days = []
  for (let i = 0; i < numDays; i++) {
    const date = moment(startDate).add(i, 'days')
    days.push({
      date,
      past: date.isBefore(moment().startOf('day')),
      events: []
    })
  }
  events.forEach(event => addEventToDays(event, days, startDate))
  return days
}

// add the event to all days to which it belongs (it will be added to at most 1 day per week)
function addEventToDays(event, days, calendarStart) {
  const start = moment(event.start).startOf('day'), end = moment(event.end || event.start).startOf('day')
  let current = moment(start), startInWeek = moment(start)
  while (current.isSameOrBefore(end)) {
    const i = current.diff(calendarStart, 'days')
    if (i >= 0 && i < days.length) {
      const item = {
        // keep all original properties from the event
        ...event,
        // title: event.title,
        // id: event.id,
        // // remove everything after first space, and lower case it
        // stage: proj.StageName.replace(/ .|)}>#i, '').toLowerCase(),
        lengthInWeek: 1 + moment.min(moment(startInWeek).endOf('isoWeek'), end).diff(startInWeek, 'day'),
      }
      // expanded flag
      item.expanded = !!(item.expanded &&
      // only the first 4
      days[i].events.filter(e => e.expanded).length < 4)
      days[i].events.push(item)
    }
    current = current.add(1, 'week').startOf('isoWeek')  // next week
    if (current.day() === 1)  // next week?  Note that we start on 1 = Monday, NOT 0 = Sunday
      startInWeek = moment(current)
  }
}
