import React from 'react'
import {Link} from 'react-router-dom';


 function Navbar() {
    return (
        <div>
        <nav>
       
           
            <Link to='/'>MERN</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
           
        
        </nav>
            
        </div>
    )
}
export default Navbar;