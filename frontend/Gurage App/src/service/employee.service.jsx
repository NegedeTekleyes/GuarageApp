
const api_url = import.meta.VITE_API_URL

const createEmployee = async (FormData) => {
const requestOptions = {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(FormData)
}
const response = await fetch(`${api_url}/api/employee`, requestOptions)
return response
}

// export all the form
const employeeService = {
    createEmployee
}

export default employeeService;