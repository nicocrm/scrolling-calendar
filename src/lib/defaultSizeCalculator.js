import {BASE_PADDING, CONTRACTED_HEIGHT, EXPANDED_HEIGHT} from '../constants'

export default function defaultSizeCalculator(week) {
  return week ? week.reduce((h, day) => Math.max(h, getDayHeight(day)), 194) : 194
}

const getDayHeight = day => BASE_PADDING + getEventBottom(day.events[day.events.length - 1])

const getEventBottom = ev => ev ? (ev.position + (ev.expanded ? EXPANDED_HEIGHT : CONTRACTED_HEIGHT)) : 0