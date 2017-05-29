import React from 'react'
import {shallow} from 'enzyme'
import moment from 'moment'
import Calendar from '../src/Calendar'

describe('Calendar', () => {
  it('renders', () => {
    const wrapper = shallow(<Calendar setRenderRange={() => null}
                                      renderRange={{start: 0, stop: 10}}
                                      min={moment('2016-01-01')}
                                      renderWeeks={[]}
                                      totalWeekCount={10}
                                      initialWeekIndex={0}/>)
    // noinspection BadExpressionStatementJS
    expect(wrapper.length).to.be.ok
  })
})