import React from 'react'
import VirtualList from 'react-tiny-virtual-list'
import {OVERSCAN} from '../constants'
import WeekRow from './WeekRow'
import weekToDate from '../lib/weekToDate'

class EventList extends React.Component {
  initListRef = (ref) => {
    this.listRef = ref
  }

  onScroll = (offset) => {
    const {start, stop} = this.listRef.sizeAndPositionManager.getVisibleRange({
      offset,
      containerSize: this.props.containerHeight,
      overscanCount: OVERSCAN
    })
    this.props.setRenderRange({start, stop})
  }

  componentWillReceiveProps(nextProps) {
    if (this.listRef && nextProps.updatedFlag !== this.props.updatedFlag) {
      this.listRef.recomputeSizes()
    }
  }

  renderWeek = ({index, style}) => {
    // console.log(`render for ${index}`);
    const week = this.props.renderWeeks[index - this.props.renderRange.start]
    if (!week)
      // this can happen in the initial render?
      return null
    return <WeekRow key={index} today={this.props.today} currentMonth={this.props.currentMonth}
                    week={week}
                    startOfWeek={weekToDate(this.props.min, index)}
                    style={style}/>
  }

  // what is the height of the week row?
  // this should be calculated according to the events
  getWeekSize = (index) => this.props.sizeCalculator(this.props.renderWeeks[index - this.props.renderRange.start])

  render() {
    // console.log(`rendering start = ${this.props.renderRange.start}`, this.props.renderWeeks);
    const estimatedSize = 194
    return <VirtualList ref={this.initListRef}
      height={this.props.containerHeight}
      width="100%"
      data-updated={this.props.updatedFlag}
      renderItem={this.renderWeek}
      itemCount={this.props.totalWeekCount}
      scrollOffset={this.props.initialWeekIndex * estimatedSize}
      itemSize={this.getWeekSize}
      estimatedItemSize={estimatedSize}
      overscanCount={OVERSCAN}
      onScroll={this.onScroll}/>
  }
}

export default EventList
