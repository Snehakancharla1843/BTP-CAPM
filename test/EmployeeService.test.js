const cds = require('@sap/cds')

const { GET, POST, expect, axios } = cds.test (__dirname+'/..')
axios.defaults.auth = { username: 'alice', password: '' }

describe('EmployeeService OData APIs', () => {

  it('serves EmployeeService.Employee', async () => {
    const { data } = await GET `/odata/v4/employee/Employee ${{ params: { $select: 'ID,nameFirst' } }}`
    expect(data.value).to.containSubset([
      {"ID":"36418647-b566-4e8f-b916-ceb86c0c65ef","nameFirst":"nameFirst-3641864"},
    ])
  })

})
