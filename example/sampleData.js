import faker from 'faker'
import moment from 'moment'

function randomEvent(from, to) {
  const start = moment(faker.date.between(from, to))
  const end = moment(start).add(faker.random.number(30), 'days')
  return {
    id: String(faker.random.uuid()),
    start,
    end,
    expanded: true,
    title: faker.random.arrayElement(['Meet', 'Inauguration', 'Ceremony', 'Ball', 'Party']) +
    ' @ ' + faker.address.city()
  }
}

export default function () {
  const result = []
  for (let i = 0; i < 300; i++) {
    result.push(randomEvent(
      moment().add(-1, 'year').toISOString(),
      moment().add(2, 'year').toISOString()))
  }
  // add a few closer ones
  for (let i = 0; i < 50; i++) {
    result.push(randomEvent(
      moment().add(-15, 'day').toISOString(),
      moment().add(25, 'day').toISOString()
    ))
  }
  return result
}
