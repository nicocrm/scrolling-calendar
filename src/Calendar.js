import React from 'react'
import PropTypes from 'prop-types'
import VirtualList from 'react-tiny-virtual-list'
import {OVERSCAN} from './constants'
import WeekRow from './components/WeekRow'
import weekToDate from './lib/weekToDate'
import Header from './components/Header'
import moment from 'moment'
import styled from 'styled-components'

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FlexItem = styled.div`
  flex: 1;

`

class Calendar extends React.Component {
  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    // used to update the {start, stop} index that are shown
    // (not necessarily visible on the screen, but rendered on the DOM)
    // will be invoked when the user scrolls, the parent should then
    // update renderStartIndex and renderWeeks
    setRenderRange: PropTypes.func.isRequired,
    // the index of the first week to be rendered
    renderRange: PropTypes.shape({
      start: PropTypes.number.isRequired,
      stop: PropTypes.number.isRequired
    }).isRequired,
    // the weeks (array of days) that are rendered
    renderWeeks: PropTypes.array.isRequired,
    // how many weeks to actually paint on the screen
    visibleWeekCount: PropTypes.number.isRequired,
    // total # of weeks
    totalWeekCount: PropTypes.number.isRequired,
    // the week to initially scroll to
    initialWeekIndex: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    min: PropTypes.object.isRequired,
    today: PropTypes.instanceOf(moment).isRequired,
    currentMonth: PropTypes.instanceOf(moment).isRequired,
    eventRenderer: PropTypes.func,
    onEventClick: PropTypes.func,
    // a flag used to signify we need to re-render the list
    updatedFlag: PropTypes.any,
    sizeCalculator: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
  }

  initRef = (ref) => {
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

  // what is the height of the week row?
  // this should be calculated according to the events
  getWeekSize = (index) => this.props.sizeCalculator(this.props.renderWeeks[index - this.props.renderRange.start])

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

  componentWillReceiveProps(nextProps) {
    if (this.listRef && nextProps.updatedFlag !== this.props.updatedFlag) {
      this.listRef.recomputeSizes()
    }
  }

  render() {
    // console.log(`rendering start = ${this.props.renderRange.start}`, this.props.renderWeeks);
    const estimatedSize = 194
    return <FlexColumn className={this.props.className}>
      <FlexItem>
        <Header month={this.props.currentMonth}/>
      </FlexItem>
      <FlexItem>
        <VirtualList ref={this.initRef}
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
      </FlexItem>
    </FlexColumn>
  }
}

export default Calendar
