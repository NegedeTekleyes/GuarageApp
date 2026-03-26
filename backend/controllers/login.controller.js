const loginService = require('../service/login.service');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

async function logIn(req, res, next) {
    console.log('Request body', req.body)
    console.log('Content type', req.headers['content-type'])
    try {
        const employeeData = req.body;
        const employee = await loginService.logIn(employeeData);

        if (employee.status === 'fail') {
            return res.status(403).json({
                status: employee.status,
                message: employee.message,
            });
        }

        const payload = {
            employee_id: employee.data.employee_id,
            employee_email: employee.data.employee_email,
            employee_role: employee.data.employee_role_id,
            employee_first_name: employee.data.employee_first_name,
            
        };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

        res.status(200).json({
            status: 'success',
            message: 'Employee login successful',
            data: { employee_token: token },
        });
    } catch (error) {
        console.error('Login controller error:', error);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
}

module.exports = { logIn };