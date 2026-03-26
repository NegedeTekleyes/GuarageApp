import { useState } from "react"
import {useNavigate,useLocation} from "react-router-dom"

function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [employee_email, setEmail] = useState('')
  const [employee_password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [serverError, setServerError] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()

    let valid = true
    // email is required
    if(!employee_email) {
      setEmail('Please Enter Email address first')
    } else if (!employee_email.includes ('@')){
      setEmailError('Invalid Email format')
     
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if(!regex.test(employee_email)) {
        setEmail('Invalid Email format')
        valid = false
      }
      setEmailError('')
       valid = false
    }
    // password is required
    if(!employee_password || employee_password.length < 6) {
      setPassword('Password length is must be at least  6 character long.')
    } else{
      setPassword('')
      valid = false
    }

    const formData = {
      employee_email,
      employee_password
    }

    const loginEmployee = loginService.logIn(formData)
    loginEmployee.then((response) => response.json())
    .then((response) => {
      if (response.status = "sucess"){
        // save the user in the local storage
        if (response.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(response.data))
        }
      }
    })
  }
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && <div className="validation" role="alert">{serverError}</div>
                      }
                      <input type="email" value={employee_email} name="employee_email" onChange={event => setEmail(event.target.value)} placeholder="Email" />
                      {emailError &&
                      <div className="validation-error" role="alert">{emailError}</div>
                      }
                    </div>
                    <div className="form-group col-md-12">
                      <input type="password" name="employee_password" placeholder="Password" />
                    </div>
                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Login</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm