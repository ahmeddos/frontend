import {Link} from 'react-router-dom'
import Search from './Search'
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuthContext'


const NavBar = () => {

  const {logout} = useLogout()
  const{user} = useAuthContext()
  const handleClick = () => {
    logout()
}

    return(
        <header>
            <div className="container">
            <Link to="/">
                 <h1> Courses Now </h1>
             </Link>
             <nav>
                 {user && (<div>
                     <span>{user.email}</span>
                     <button onClick={handleClick}>Log out</button>
                      </div>)}

                 {!user && (<div>
                     <Link to= '/login'>Login</Link>
                     <Link to= '/signup'>Sign up</Link>
                 </div>)}
             </nav>
             <Search/>
            </div>

        </header>
    )
}

export default NavBar
