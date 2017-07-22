import React from 'react'
import ScrollingCalendar from '../src/index'
import sampleData from './sampleData'
import {withState} from 'recompose'

const sampleEvents = sampleData()
console.log(sampleEvents)

const App = ({events, setEvents}) => {
  const refreshEvents = ({start, stop}) => {
    console.log(`REFRESHING EVENT ${start} - ${stop}`)
    setTimeout(() => {
      setEvents(sampleEvents.filter(e => e.start.isSameOrBefore(stop) && e.end.isSameOrAfter(start)))
    }, 600)
  }
  const onVisibleRangeChanged = ({start, stop}) => {
    console.log(`VISIBLE RANGE CHANGED ${start} - ${stop}`)
  }
  return <ScrollingCalendar onLoadEvents={refreshEvents}
    onVisibleRangeChanged={onVisibleRangeChanged}
    events={events}/>
}

export default withState('events', 'setEvents', [])(App)
