import {jsdom} from 'jsdom'
import sinon from 'sinon'
import chai, {should, expect} from 'chai'
import sinonChai from 'sinon-chai'
import chaiSubset from 'chai-subset'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiSubset)
chai.use(sinonChai)
chai.use(chaiEnzyme())

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator
should()
global.should = should
global.expect = expect
global.sinon = sinon

require('react')
require('enzyme')
