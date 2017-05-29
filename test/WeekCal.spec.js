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

  it('creates week rows', () => {
    const wrapper = mount(<WeekCal onLoadEvents={() => null} events={[]}/>)
    // noinspection BadExpressionStatementJS
    expect(wrapper.find(WeekRow).length).to.be.ok
  })
})
