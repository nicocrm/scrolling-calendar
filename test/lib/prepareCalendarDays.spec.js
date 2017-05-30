import prepareCalendarDays from '../../src/lib/prepareCalendarDays.js'

describe('projects:prepareCalendarDays', () => {
  it('should generate array of correct length', () => {
    const data = prepareCalendarDays([], '2016-01-01', 10)
    expect(data).to.have.length(10)
    expect(data[0].date.format('YYYY-MM-DD')).to.equal('2016-01-01')
    expect(data[1].date.format('YYYY-MM-DD')).to.equal('2016-01-02')
    expect(data[2].date.format('YYYY-MM-DD')).to.equal('2016-01-03')
  })

  it('should add project to array at correct position (1 day)', () => {
    const proj = {
      start: '2016-01-03',
      title: 'Test Project',
      stage: 'closed',
      id: '123',
      expanded: false
    }
    const data = prepareCalendarDays([proj], '2016-01-01', 10)
    expect(data[2].events).to.containSubset([
      {
        title: 'Test Project',
        stage: 'closed',
        id: '123',
        lengthInWeek: 1,
      }
    ])
  })

  it('should not take time into account when adding event', () => {
    const proj = {
      start: '2016-01-03T23:00:00',
      end: '2016-01-04T12:00:00',
      title: 'Test Project',
      stage: 'closed',
      id: '123',
      expanded: false
    }
    const data = prepareCalendarDays([proj], '2016-01-04', 10)
    expect(data[0].events).to.containSubset([
      {
        title: 'Test Project',
        stage: 'closed',
        id: '123',
        lengthInWeek: 1,
      }
    ])
    expect(data[0].events).to.have.length(1)
  })

  it('should add multiple projects to array', () => {
    const proj = {
      start: '2016-01-04',
      title: 'Test Project',
      stage: 'closed',
      id: '123'
    }
    const proj2 = {
      start: '2016-01-04',
      end: '2016-01-05',
      title: 'Second Project',
      stage: 'closed',
      id: '124'
    }
    const data = prepareCalendarDays([proj, proj2], '2016-01-02', 10)
    expect(data[2].events).to.containSubset([
      {
        title: 'Test Project',
        stage: 'closed',
        id: '123',
        lengthInWeek: 1,
      }, {
        title: 'Second Project',
        stage: 'closed',
        id: '124',
        lengthInWeek: 2,
      }
    ])
  })

  it('should not add days for project before start of calendar', () => {
    const proj = {
      start: '2015-12-31',
      title: 'Test Project'
    }
    const data = prepareCalendarDays([proj], '2016-01-01', 10)
    for(let i = 0; i < data.length; i++) {
      expect(data[i].events).to.eql([])
    }
  })

  it('should add project when start before start of calendar', () => {
    const proj = {
      start: '2016-01-03',
      end: '2016-01-05',
      title: 'Test Project'
    }
    const data = prepareCalendarDays([proj], '2016-01-04', 10)
    data[0].events.should.have.length(1)
  })

  it('should add project for different weeks', () => {
    const proj2 = {
      start: '2016-01-02',  // this is a Saturday
      end: '2016-01-04',
      title: 'Second Project',
      stage: 'closed',
      id: '123'
    }
    const data = prepareCalendarDays([proj2], '2016-01-01', 10)
    expect(data[1].events, 'Saturday 1-2').to.containSubset([
      {
        title: 'Second Project',
        lengthInWeek: 2,  // Sat + Sun
        stage: 'closed',
        id: '123'
      }
    ])
    expect(data[3].events, 'Monday 1-4').to.containSubset([
      {
        title: 'Second Project',
        lengthInWeek: 1,  // Mon
        stage: 'closed',
        id: '123'
      }
    ])
  })

  it('should flag past days as past', () => {
    const data = prepareCalendarDays([], '2016-01-01', 10)

    for(let i = 0; i < data.length; i++) {
      expect(data[i].past).to.equal(true)
    }
  })

  it('should not flag present and future days as past', () => {
    const data = prepareCalendarDays([], new Date(), 10)

    for(let i = 0; i < data.length; i++) {
      expect(data[i].past).to.equal(false)
    }
  })

  it('should mark expanded events as expanded only', () => {
    const proj = {
      start: '2016-01-01',
      end: '2016-01-04',
      Name: 'First Project',
      expanded: true,
      Id: '123'
    }
    const proj2 = {
      start: '2016-01-02',
      end: '2016-01-04',
      Id: '123'
    }
    const data = prepareCalendarDays([proj, proj2], '2016-01-01', 10)
    expect(data[0].events[0]).to.have.property('expanded').that.equals(true)
    expect(data[1].events[0]).to.have.property('expanded').that.equals(false)
  })

  it('should only mark first 4 closed won events as expanded within 1 day', () => {
    const projs = []
    for(let i = 0; i < 5; i++) {
      projs.push({
        start: '2016-01-01',
        end: '2016-01-04',
        Name: 'First Project',
        StageName: 'Closed Won',
        expanded: true,
        Id: '123'
      })
    }
    const data = prepareCalendarDays(projs, '2016-01-01', 10)
    expect(data[0].events[0], 'first event must be expanded').to.have.property('expanded').that.equals(true)
    expect(data[0].events[4], 'fifth event (on first day) must not be expanded').to.have.property('expanded').that.equals(false)
  })

  it('should only mark first 4 closed won events as expanded within 1 day - more complicated', () => {
    const projs = []
    for(let i = 0; i < 3; i++) {
      projs.push({
        start: '2016-01-01',  // 1/1 is Friday
        end: '2016-01-05',
        Name: 'First Project',
        StageName: 'Closed Won',
        expanded: true,
        Id: '123'
      })
    }
    projs.push({
      start: '2016-01-01',
      end: '2016-01-04',
      Name: 'Shorter project',
      StageName: 'Closed Won',
      expanded: true,
      Id: '123'
    })
    projs.push({
      start: '2016-01-03',
      end: '2016-01-06',
      Name: 'A project that starts during the previous one',
      StageName: 'Closed Won',
      expanded: true,
      Id: '123'
    })
    const data = prepareCalendarDays(projs, '2016-01-01', 10)
    // this is the "shorter" one
    expect(data[0].events[3], '4th event on first day').to.have.property('expanded').that.equals(true)
    // on Monday, the last event should not be expanded
    expect(data[3].events).to.have.length(5)
    expect(data[3].events[4]).to.have.property('expanded').that.equals(false)
  })

  // This is not really relevant, since the proposal one will not be expanded anyway...
  // it('should mark closed won stage as expanded in preference to other stages, even when they start earlier', () => {
  //   const projs = []
  //   for(let i=0; i < 3; i++) {
  //     projs.push({
  //       EventStartDate__c: '2016-01-01',
  //       EventEndDate__c: '2016-01-06',
  //       Name: 'A closed project',
  //       StageName: 'Closed Won',
  //       Id: '123'
  //     })
  //   }
  //   projs.push({
  //     EventStartDate__c: '2016-01-01',
  //     EventEndDate__c: '2016-01-03',
  //     Name: 'proposal that starts on the first',
  //     StageName: 'Proposal',
  //     Id: '123'
  //   })
  //   projs.push({
  //     EventStartDate__c: '2016-01-02',
  //     EventEndDate__c: '2016-01-03',
  //     Name: 'closed that starts on the second',
  //     StageName: 'Closed Won',
  //     Id: '123'
  //   })
  //   const data = prepareCalendarDays(projs, '2016-01-01', 10)
  //   expect(data[0].events[3]).to.have.property('title').that.equals('proposal that starts on the first')
  //   expect(data[0].events[3]).to.have.property('expanded').that.equals(false)
  //   expect(data[1].events[3]).to.have.property('title').that.equals('proposal that starts on the first')
  //   expect(data[1].events[4]).to.have.property('title').that.equals('closed that starts on the second')
  //   expect(data[1].events[4]).to.have.property('expanded').that.equals(true)
  // })
})
