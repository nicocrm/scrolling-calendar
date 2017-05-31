import defaultSizeCalculator from '../../src/lib/defaultSizeCalculator'
import {BASE_PADDING, EXPANDED_HEIGHT} from '../../src/constants'
describe('defaultSizeCalculator', () => {
  it('does not fail for null', () => {
    // noinspection BadExpressionStatementJS
    defaultSizeCalculator(null).should.be.ok
  })

  it('does not fail for empty event array', () => {
    // noinspection BadExpressionStatementJS
    defaultSizeCalculator([{events: []}]).should.be.ok
  })

  it('calculates height based on last event', () => {
    const result = defaultSizeCalculator([
      {
        events: [
          {position: 10, expanded: true},
          {position: 240, expanded: true}
        ]
      }
    ])
    result.should.equal(240 + EXPANDED_HEIGHT + BASE_PADDING)
  })
})