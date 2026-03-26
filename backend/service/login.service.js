const bcrypt = require('bcrypt');
const employeeService = require('./employee.service');

async function logIn(employeeData) {
    try {
        // Guard against missing input
        if (!employeeData || !employeeData.employee_email) {
            return { status: 'fail', message: 'Email is required' };
        }

        const result = await employeeService.getEmployeeByEmail(employeeData.employee_email);
        console.log('Employee from DB:', result);

        // Normalize result to a single employee object
        let employee = null;
        if (Array.isArray(result)) {
            if (result.length === 0) {
                return { status: 'fail', message: 'Employee does not exist' };
            }
            employee = result[0];
        } else if (result && typeof result === 'object') {
            // Already a single object
            employee = result;
        } else {
            return { status: 'fail', message: 'Employee does not exist' };
        }

        // Compare passwords using the correct field name
        const passwordMatch = await bcrypt.compare(
            employeeData.employee_password,
            employee.employee_password_hashed 
        );

        if (!passwordMatch) {
            return { status: 'fail', message: 'Incorrect password' };
        }

        // Return the employee data (excluding sensitive fields if needed)
        return { status: 'success', data: employee };
    } catch (error) {
        console.error('Login service error:', error);
        return { status: 'fail', message: 'Service error' };
    }
}

module.exports = { logIn };