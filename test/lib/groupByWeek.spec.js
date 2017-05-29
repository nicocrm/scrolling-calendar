import groupByWeek from '../../src/lib/groupByWeek'
describe('groupByWeek', () => {
  it('creates an array with days grouped by 7', () => {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const weeks = groupByWeek(days)
    weeks.should.eql([[1, 2, 3, 4, 5, 6, 7], [8, 9]])
  })
})