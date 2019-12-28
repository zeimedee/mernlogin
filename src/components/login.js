import React, {useState} from 'react'

 function Login() {

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const handleSubmit =()=>{
        alert("login success")
    }
    return (
        <div>
           
           <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='text'
                            id='email'
                            value={email}
                            onChange={e =>SetEmail(e.target.value) }
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='text'
                            id='password'
                            value={password}
                            onChange={e => SetPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>

           </form>
        </div>
    )
}
export default Login;