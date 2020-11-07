// import React, {useState} from 'react';
// import { registerUser } from '../api';

// const Register = ({ setCurrentUser }) => {
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');

//   return <form onSubmit={ async (event) => {

//     event.preventDefault()
//     const user = await registerUser(username, password);
//     setCurrentUser(username);
//     // read values from the form
//     // await registerUser(username, password);
//     // setCurrentUser()
//   }}>
//     <input type='username' placeHolder="username" value={ username } onChange={ e => setUsername(e.target.value) } />
//     <input type='password' placeHolder="password" value={ password } onChange={ e => setPassword(e.target.value) } />
//     <button>SUBMIT!</button>
//   </form>
// }

// export default Register;

