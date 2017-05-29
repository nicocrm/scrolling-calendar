import React from 'react'
import WeekCal from '../src/index'
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
  return <div className="outer">
    <WeekCal onLoadEvents={refreshEvents} events={events}/>
  </div>
}

export default withState('events', 'setEvents', [])(App)
