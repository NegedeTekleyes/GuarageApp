import { useState } from "react";

const [employee_first_name, setFirstName] = useState('')
const [employee_last_name, setLastName] = useState('')
const [employee_email, setEmail] = useState('')
const [employee_password, setPassword] = useState('')
const [employee_phone, setPhoneNumber] = useState('')
const [active_employee, setActive_employee] = useState(1)
const [company_role_id, setRole] = useState(1)

// set error
const [emailError, setEmailError] = useState('')
const [firstNameRequired, setFirstNameRequires] = useState('')
const [passwordError, setPasswordError] = useState('')
const [sucess, setSucess] = useState(false)
const [serverError, setServerError] = useState('')

const handleSubmit = (e) => {
  e.preventDefault()
  // handle client side validation
  let valid = true  // flag

  // first name required
  if(!employee_first_name) {
    setFirstNameRequires('First name is required')
    valid = false
  } else{
    setFirstNameRequires('')
  }

 
}
function AddEmployeeForm() {
  return (
   
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError &&
                      <div className="validation-error" role="alert">{serverError}</div>
                      }
                      <input type="email" value={employee_email} name="employee_email" onChange= {event => setEmail(event.target.value)} placeholder="Employee email" />
                      {emailError &&
                      <div className="validation-error" role="alert">{emailError}</div>
                      }
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" value={employee_first_name} name="employee_first_name" onChange={event => setFirstName(event.target.value)} placeholder="Employee first name" />
                    </div>

                    <div className="form-group col-md-12">
                      <input type="text" value={employee_last_name} name="employee_last_name" onChange={event => setLastName(event.target.value)} placeholder="Employee last name" required />
                    </div>

                    <div className="form-group col-md-12">
                      <input type="text" value={employee_phone} name="employee_phone" onChange={event => setPhoneNumber(event.target.value)} placeholder="Employee phone (555-555-5555)" required />
                    </div>

                    <div className="form-group col-md-12">
                      <select name="employee_role" className="custom-select-box">
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <input type="password" value={setPassword} name="employee_password" onChange={event => setPassword(event.target.value)} placeholder="Employee password" />
                      {passwordError && <div className="validation-error" role="alert">{passwordError}</div>
                      }
                    </div>

                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add employee</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm