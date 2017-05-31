import React from 'react'
import {mount} from 'enzyme'
import Event from '../../src/components/Event'

describe('Event', () => {
  const sampleEvent = {title: 'sample', id: '123', start: new Date(), end: new Date()}

  it('renders with default renderer', () => {
    const wrapper = mount(<Event event={sampleEvent} />)
    wrapper.should.have.descendants('.event-title')
  })

  it('renders with custom renderer', () => {
    const Custom = ({event}) => <div className='custom'>{event.title}</div>
    const wrapper = mount(<Event event={sampleEvent} eventRenderer={Custom} />)
    wrapper.should.have.descendants('.custom')
  })

  it('invokes click handler bound with event', () => {
    const f = sinon.spy()
    const wrapper = mount(<Event event={sampleEvent} onEventClick={f} />)
    wrapper.find('.event').simulate('click')
    f.should.have.been.calledWith({event: sampleEvent})
  })
})