import React from 'react'
import {shallow, mount} from 'enzyme'
import WeekCal from '../src/index'
import WeekRow from '../src/components/WeekRow'

describe('WeekCal', () => {
  it('renders', () => {
    const wrapper = shallow(<WeekCal onLoadEvents={() => null} events={[]}/>)
    // noinspection BadExpressionStatementJS
    expect(wrapper.length).to.be.ok
  })

  // this does not work because the calculatedHeight comes up as 0 so the eventlist is not rendered
  // it('creates week rows', () => {
  //   const wrapper = mount(<WeekCal onLoadEvents={() => null} events={[]}/>)
  //   // noinspection BadExpressionStatementJS
  //   console.log(wrapper.html())
  //   expect(wrapper.find('EventList').length).to.be.ok
  //   // expect(wrapper.find(WeekRow).length).to.be.ok
  // })
})
