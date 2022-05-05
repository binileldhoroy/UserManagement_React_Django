import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div className='container-fluid'>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/' > <p className="navbar-brand">Home</p></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#"> {user && <p>Welcome {user.username}</p> } </a>
        </li>
        
      </ul>
      <form className="form-inline my-2 my-lg-0 d-flex justify-content-center  ">
      {user && <button className="btn btn-outline-success my-2 my-sm-0" onClick={logoutUser} type="submit">Logout </button>}
      </form>
    </div>
  </nav> */}
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <p className="navbar-brand"> <Link to='/' >Home</Link></p>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
      </ul>
      <form className="d-flex">
      <h6 className="nav-link" href="#"> {user && <p>Welcome {user.username}</p> } </h6>
       
      {user && <button className="btn btn-outline-success my-2 my-sm-0" onClick={logoutUser} type="submit">Logout </button>}
      </form>
    </div>
  </div>
</nav>



  </div>

  
    )
}

export default Header
