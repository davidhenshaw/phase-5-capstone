import {React} from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

function NavBar(props)
{
    return(
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Browse Categories</Link>
            </li>
            <li>
              <Link to="/projects">Browse Projects</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </nav>
    )
}

export default NavBar