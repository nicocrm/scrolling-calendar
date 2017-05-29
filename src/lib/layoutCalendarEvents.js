export const EXPANDED_HEIGHT = 4 + 19 + 6 - 3
export const CONTRACTED_HEIGHT = 4 + 9 - 3

// calculate optimal position for all the events on the calendar
// days always must start on the first day of the week
export default function layoutCalendarEvents(days) {
  for (let i = 0; i < days.length; i += 7) {
    const positions = []  // an array of the event occupied places during the week
    layoutEventsInWeek(days, positions, i, e => e.stage === 'closed')
    // console.log('after closed events, positions' , positions);
    layoutEventsInWeek(days, positions, i, e => e.stage !== 'closed')
    // console.log('after open events, positions' , positions);
  }
  return days
}

// layout the events matching the given condition for a week
// this allows us to place the closed events first
function layoutEventsInWeek(days, positions, i, condition) {
  for (let j = 0; j < 7 && i + j < days.length; j++) {
    for (let eventToPosition of days[i + j].events) {
      if (condition(eventToPosition)) {
        eventToPosition.position =
          calculatePosition(positions, i + j, eventToPosition.lengthInWeek, getEventHeight(eventToPosition))

        for (let k = 0; k < eventToPosition.lengthInWeek; k++) {
          if (!positions[i + j + k])
            positions[i + j + k] = []
          positions[i + j + k].push(eventToPosition)
        }
      }
    }
  }
}

function getEventHeight(event) {
  return event.expanded ? EXPANDED_HEIGHT : CONTRACTED_HEIGHT
}

// calculate a position - this is returned as a pair of [expanded, contracted]
function calculatePosition(positions, currentDay, itemLength, height) {
  let pos = 0, npos
  while ((npos = intersects(pos, positions, currentDay, itemLength, height)) !== false) {
    pos = npos
  }
  return pos
}

// not a great algo, but the number of events is small enough that this should be alright, and I can't think of a way to optimize it...
function intersects(pos, positions, i, length, height) {
  for (let j = 0; j < length; j++) {
    const evs = positions[i + j]
    if (!evs)
      continue
    for (let ev of evs) {
      const evH = getEventHeight(ev)
      if (pos < ev.position + evH && pos + height > ev.position)
        return ev.position + evH
    }
  }
  return false
}
