import React from 'react'
import PropTypes from 'prop-types'
import VirtualList from 'react-tiny-virtual-list'
import WeekRow from './components/WeekRow'
import {OVERSCAN} from './constants'

class WeekCal extends React.Component {
  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    // used to update the {start, stop} index that are shown
    // (not necessarily visible on the screen, but rendered on the DOM)
    // will be invoked when the user scrolls, the parent should then
    // update renderStartIndex and renderWeeks
    setRenderRange: PropTypes.func.isRequired,
    // the index of the first week to be rendered
    renderStartIndex: PropTypes.number.isRequired,
    // the weeks (array of days) that are rendered
    renderWeeks: PropTypes.array.isRequired,
    // how many weeks to actually paint on the screen
    visibleWeekCount: PropTypes.number,
    // total # of weeks
    totalWeekCount: PropTypes.number.isRequired,
    // the week to initially scroll to
    initialWeekIndex: PropTypes.number.isRequired
  }

  initRef = (ref) => {
    this.listRef = ref
  }

  onScroll = (offset) => {
    const {start, stop} = this.listRef.sizeAndPositionManager.getVisibleRange({
      offset,
      containerSize: 600,
      overscanCount: 10
    })
    this.props.setRenderRange({start, stop})
  }

  getWeekSize = (index) => {
    return 194
  }

  renderWeek = ({index, style}) => {
    const week = this.props.renderWeeks[index - this.props.renderStartIndex]
    return <WeekRow week={week} style={style}/>
  }

  render() {
    const estimatedSize = 194
    return <VirtualList ref={this.initRef}
                        height={600}
                        width="100%"
                        renderItem={this.renderWeek}
                        itemCount={this.props.totalWeekCount}
                        scrollOffset={this.props.initialWeekIndex * estimatedSize}
                        itemSize={this.getWeekSize}
                        estimatedItemSize={estimatedSize}
                        overscanCount={OVERSCAN}
                        onScroll={this.onScroll}/>
  }
}

export default WeekCal
