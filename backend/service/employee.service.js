const pool = require('../config/db.config')
const bcrypt = require('bcrypt')
async function createEmployee(employee) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO employee (employee_email, active_employee)
       VALUES ($1, $2)
       RETURNING employee_id`,
      [employee.employee_email, employee.active_employee]
    );

    const employee_id = result.rows[0].employee_id;

    await client.query(
      `INSERT INTO employee_info 
       (employee_id, employee_first_name, employee_last_name, employee_phone)
       VALUES ($1, $2, $3, $4)`,
      [
        employee_id,
        employee.employee_first_name,
        employee.employee_last_name,
        employee.employee_phone,
      ]
    );

    await client.query(
      `INSERT INTO employee_pass 
       (employee_id, employee_password_hashed)
       VALUES ($1, $2)`,
      [employee_id, await bcrypt.hash(employee.employee_password, 10)]
    );

    await client.query(
      `INSERT INTO employee_role 
       (employee_id, company_role_id)
       VALUES ($1, $2)`,
      [employee_id, employee.company_role_id]
    );

    await client.query("COMMIT");

    return { employee_id };

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return false;
  } finally {
    client.release();
  }
}

async function checkEmployeeExists(email) {
  const result = await pool.query(
    "SELECT employee_id FROM employee WHERE employee_email = $1",
    [email]
  
  )
    // return result.rows.length > 0
}

module.exports = {
  createEmployee,
  checkEmployeeExists
}