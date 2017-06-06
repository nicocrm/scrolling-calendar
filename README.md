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

### onLoadEvents

A function

### visibleWeekCount



## Limitations

 * Uses a week starting on Monday - this is not currently configurable (you'd have to change references from isoWeek to week)
 * Does not support arbitrary renderer for events
