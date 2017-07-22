# f1-week-cal

An event calendar with:

 * Infinite scrolling with dynamic event loading
 * Week by week representation of events
 * Support for multi-day events
 * Support for collapsible events
 * Variable row height

## Usage

```
npm install scrolling-calendar

import ScrollingCalendar from 'scrolling-calendar'

const myCalendar = () =>
    <ScrollingCalendar events={myEvents} onLoadEvents={loadAction} />
```

**Important**: the calendar's container must have a set height, for example, it could
be a child in a flex layout, or just have a height of 100%.

## Props

### min

Min boundary for the scroll (yes it is not truly infinite, it will only scroll up to that point).
Defaults to 5 years ago.

### max

Max boundary for the scroll.  Defaults to 10 years in the future.

### initialDate

Date to initially start the calendar at.  Defaults to start of current week.

### events

Array of events, objects with the following properties:

 * id
 * title
 * start (a date, string or moment)
 * end (ditto)

### onLoadEvents({start, stop})

A function that will be called when the window of loaded events change.  This should trigger the loading of events, which will be provided via the events prop.  The function itself can return immeditately - we'll wait for the new events to arrive to signify that the loading has completed.
`start` and `stop` are strings in the YYYY-MM-DD format.

### onVisibleRangeChanged

A callback for when the user has scrolled the view.  This can be used to display additional details about the currently displayed events.
`start` and `stop` are strings in the YYYY-MM-DD format.

### visibleWeekCount

Number of weeks to show on calendar.  The size of the week rows will be calculated accordingly.

## Limitations

 * Uses a week starting on Monday - this is not currently configurable (you'd have to change references from isoWeek to week)
 * Does not support arbitrary renderer for events
