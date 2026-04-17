import { useState } from "react"
import {useNavigate,useLocation} from "react-router-dom"
import { loginService } from "../../../service/login.service"

function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [employee_email, setEmail] = useState('')
  const [employee_password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [ServerError, setServerError] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault();

  let valid = true;

  // Email validation
  if (!employee_email) {
    setEmailError('Please enter email address first');
    valid = false;
  } else {
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(employee_email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }
  }

  // Password validation
  if (!employee_password || employee_password.length < 6) {
    setPasswordError('Password must be at least 6 characters long');
    valid = false;
  } else {
    setPasswordError('');
  }

  if (!valid) return;

  const formData = {
    employee_email,
    employee_password
  };

  try {
    const res = await loginService.logIn(formData);
    const data = await res.json();

    if (data.status === "success") {
      if (data?.data?.employee_token) {
        localStorage.setItem("employee_token", data?.data?.employee_token);
      }
      localStorage.setItem("employee",JSON.stringify(data.data))

      navigate('/');
    } else {
      setServerError(data.message);
    }
  } catch (error) {
    console.error(error);
    setServerError("An error has occurred. Please try again.");
  }
};
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
                      {ServerError && (
                        <div className="validation" role="alert">
                          {ServerError}
                          </div>
                      )}
                      
                      
                      <input type="email" value={employee_email} name="employee_email" onChange={event => setEmail(event.target.value)} placeholder="Email" />
                      {emailError &&
                      <div className="validation-error" role="alert">{emailError}</div>
                      }
                    </div>
                    <div className="form-group col-md-12">
                      <input type="password" value={employee_password} name="employee_password" onChange={event => setPassword(event.target.value)} placeholder="Password" />
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