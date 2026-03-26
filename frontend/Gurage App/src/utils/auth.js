// function to read data from local storage
const getAuth =  async () => {
// to read data
const employee = await JSON.parse(localStorage.getItem('employee'))
if (employee && employee.employee_token) {
const decodedToken = await decodeTokenPayload(employee.employee_token)
employee.employee_role = decodeTokenPayload(employee.employee_role)
employee.employee_id = decodeTokenPayload(employee.employee_id)
employee.employee_first_name = decodeTokenPayload(employee.employee_first_name)
return employee
} else{
    return {}
}

// function to decode the payload
}
const decodeTokenPayload = (token) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/-/g, '/')
    const jsonPayload = decodeURIComponent (
        atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16).slice(-2)}`}`)
        .join('')
    )
    return JSON.parse(jsonPayload)

}

export default getAuth