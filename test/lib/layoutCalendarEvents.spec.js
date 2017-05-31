import layoutCalendarEvents from '../../src/lib/layoutCalendarEvents.js'
import {EXPANDED_HEIGHT} from '../../src/constants'

describe('projects:layoutCalendarEvents', () => {
  it('should default positions to 0', () => {
    let days = [
      {
        events: [ { expanded: true, stage: 'closed', lengthInWeek: 1 } ]
      }
    ]
    days = layoutCalendarEvents(days)
    expect(days[0].events[0].position).to.equal(0)
  })

  it('should place one event after the other', () => {
    let days = [
      {
        events: [ { expanded: true, stage: 'closed', lengthInWeek: 1 },
          { expanded: true, stage: 'closed', lengthInWeek: 1 } ]
      }
    ]
    days = layoutCalendarEvents(days)
    expect(days[0].events[1].position).to.equal(EXPANDED_HEIGHT)
  })

  it('should place closed events before the open ones', () => {
    let days = [
      { events: [ { expanded: true, stage: 'open', id: 'open event', lengthInWeek: 5 },
        { expanded: true, stage: 'closed', id: 'closed event', lengthInWeek: 2 } ] }
    ]
    days = layoutCalendarEvents(days)
    expect(days[0].events[0].position).to.equal(EXPANDED_HEIGHT)
    expect(days[0].events[1].position).to.equal(0)
  })

  it('should include previous events in the calculation', () => {
    let days = [
      { events: [ { expanded: true, stage: 'closed', lengthInWeek: 5 } ] },
      { events: [ { expanded: true, stage: 'closed', lengthInWeek: 2 } ] }
    ]
    days = layoutCalendarEvents(days)
    expect(days[1].events[0].position).to.equal(EXPANDED_HEIGHT)
  })

  // this one makes sure that the closed events are laid out first, so that they are on top
  it('should calculate positive position on an open stage when there is a closed stage that starts later', () => {
    let days = [
      { events: [ { expanded: false, stage: 'open', lengthInWeek: 5 } ] },
      { events: [ { expanded: true, stage: 'closed', lengthInWeek: 2 } ] }
    ]
    days = layoutCalendarEvents(days)
    expect(days[0].events[0].position).to.equal(EXPANDED_HEIGHT)
  })

  it('should let open stage slide under the previous one', () => {
    let days = [
      { events: [
        { expanded: true, stage: 'closed', lengthInWeek: 1 },
        { expanded: false, stage: 'open', lengthInWeek: 3 }
      ] },
      { events: [ { expanded: false, stage: 'open', lengthInWeek: 2 } ] }
    ]
    days = layoutCalendarEvents(days)
    expect(days[1].events[0].position).to.equal(0)
  })
})
