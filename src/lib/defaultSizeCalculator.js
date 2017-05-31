import {BASE_PADDING, CONTRACTED_HEIGHT, EXPANDED_HEIGHT} from '../constants'

export default function defaultSizeCalculator(week) {
  return week ? week.reduce((h, day) => Math.max(h, getDayHeight(day)), 194) : 194
}

const getDayHeight = day => BASE_PADDING + day.events.reduce((h, ev) => h + getEventHeight(ev), 0) + EXPANDED_HEIGHT

const getEventHeight = ev => ev.expanded ? EXPANDED_HEIGHT : CONTRACTED_HEIGHT