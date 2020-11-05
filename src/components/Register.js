
import { registerUser } from '../api';

const Register = ({ setCurrentUser }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  return <form onSubmit={ async (event) => {

    event.preventDefault()
  
    // read values from the form
    // await registerUser(username, password);
    // setCurrentUser()
  }}>
    <input type='password' value={ password } onChange={ e => setPassword(e.target.value) } />
    <button>SUBMIT!</button>
  </form>
}

