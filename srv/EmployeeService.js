const cds = require('@sap/cds');
const db = cds.connect.to('db');

module.exports = (srv) => {
  const { Employee } = srv.entities;

  srv.before('CREATE', Employee, async (req) => {
    const { salaryAmount } = req.data;
    const curr = req.data.currency?.code || req.data.currency;
    if (!(salaryAmount < 50000 && curr === 'USD')) {
      return req.error(301, 'Employee salary must be less than 50000 USD');
    }
  });

  srv.after('CREATE', Employee, async () => {
    console.log('Create Operation Successful');
  });

  srv.before('UPDATE', Employee, async (req) => {
    const { ID, nameFirst, loginName, salaryAmount } = req.data;
    const existing = await db.run(SELECT.one.from(Employee).where({ ID }));
    if (!existing) return req.error(404, `Employee ${ID} not found`);
    if (!nameFirst || !loginName) {
      return req.error(400, 'Both nameFirst and loginName are required.');
    }
    if (existing.nameFirst !== nameFirst || existing.loginName !== loginName) {
      return req.error(400, 'Operation not allowed: nameFirst and loginName cannot be changed.');
    }
    const curr = req.data.currency?.code || req.data.currency;
    if (!(salaryAmount < 50000 && curr === 'USD')) {
      return req.error(301, 'Employee salary must be less than 50000 USD');
    }
  });

  srv.on('UPDATE', Employee, async (req) => {
    const { ID, ...data } = req.data;
    await db.run(UPDATE(Employee).set(data).where({ ID }));
  });

  srv.after('UPDATE', Employee, async () => {
    console.log('Update operation successful');
  });

  srv.on('DELETE', Employee, async (req) => {
    const { ID } = req.data;
    const existing = await db.run(SELECT.one.from(Employee).where({ ID }));
    if (!existing) return req.error(404, `Employee ${ID} not found`);
    if (existing.nameFirst && existing.nameFirst.startsWith('S')) {
      return req.error(302, 'Operation not allowed for employees whose name starts with S');
    }
    await db.run(DELETE.from(Employee).where({ ID }));
  });

  srv.after('DELETE', Employee, async () => {
    console.log('Delete Operation is completed');
  });
};
