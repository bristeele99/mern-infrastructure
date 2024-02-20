// import { Component } from "react";

// export default class SignUpForm extends Component {
//   state = {
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//     error: ""
//   };

//   handleChange=(evt)=>{
//     this.setState(
//         {
//             [evt.target.name]: evt.target.value,
//             error: " "
//         }
//     )
//   }

//   handleSubmit=(evt)=>{
//     evt.preventDefault()
//     try{
//       const formData = {...this.state}
//       this.props.setUser(formData)
//     }
//     catch{
//       this.setState({error:"Sign Up Failed"})
//       alert(JSON.stringify(this.state));
//     }
//   }


//   render() {
//     const disable = this.state.password !== this.state.confirm;
//     return (
//       <div>
//         <h1>Sign Up Form</h1>
//         <div>
//           <div className="form-container">
//             <form autoComplete="off" onSubmit={this.handleSubmit}>
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={this.state.name}
//                 onChange={this.handleChange}
//                 required
//               />
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//                 required
//               />
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.handleChange}
//                 required
//               />
//               <label>Confirm</label>
//               <input
//                 type="password"
//                 name="confirm"
//                 value={this.state.confirm}
//                 onChange={this.handleChange}
//                 required
//               />
//               <button type="submit" disabled={disable}>
//                 SIGN UP
//               </button>
//             </form>
//           </div>
//           <p className="error-message">&nbsp;{this.state.error}</p>
//         </div>
//       </div>
//     );
//   }
// }

import { useState } from 'react';
import { signUp } from '../../utilities/users-service.js';
// imports the useState hook from the 'react' package

 export const SignUpForm = ( { setUser }) => {
  //functional component declaration
  const [formData, setFormData] = useState({
    //using useState hook from 'react' to setthe formData using a setFormData function; also initializes formData as object with form fields;
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [error, setError] = useState('');
  

  const handleFormSubmit = async(event) => {
    //this function called when form submitted
    event.preventDefault();
    //prevents default refresh after form submit;
    try{
      const userData = {...formData};
      delete userData.confirm;
      // const user = {
      //   name:formData.name,
      //   email: formData.email,
      //   password: formData.password
      // }

      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(userData);
      setUser(user);
    } catch (error) {
      setError('Sign Up Failed -Try Again');
    }
  } 

  const handleFormChange = (event) => {
    //this function is called when form input changes
    setFormData({...formData, [event.target.name]: event.target.value})
    //this updates the formData state using spread operator and updating field corresponding to change input
  }

// useEffect(()=> {
//   console.log(formData);
// }, [formData]);

  const disable = formData.password !== formData.confirm;

  return (
    <div>
       <div className="form-container">
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <label>Name</label>
           <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                required
              />
              <label>Confirm</label>
              <input
                type="password"
                name="confirm"
                value={formData.confirm}
                onChange={handleFormChange}
                required
              />
              <button type="submit" disabled={disable}>
                SIGN UP
              </button>
            </form>
          </div>
          <p className="error-message">&nbsp;{error}</p>
        </div>
      );
  };

export default SignUpForm;