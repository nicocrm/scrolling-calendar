import { jsdom } from 'jsdom'
import { expect } from 'chai'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator
global.expect = expect

require('react')
require('enzyme')
