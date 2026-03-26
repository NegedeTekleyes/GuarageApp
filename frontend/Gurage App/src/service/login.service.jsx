const api_url = import.meta.env.VITE_API_URL

const logIn = async (FormData) => {
const requestOptions = {
    method : "POST",
    headers: {
        'content-type': 'application/json'
    }
}
const response = await fetch(`${api_url}/api/employee/login`, requestOptions)
return response
}

module.exports = {
    logIn
}