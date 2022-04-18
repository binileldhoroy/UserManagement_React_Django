import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext';
import {Link} from 'react-router-dom'


function AdminHeader() {

    const { user, logoutAdmin } = useContext(AuthContext);

  return (
    <div>
      <Row className='my-3 py-2 bg-light'>
          <Col><h4>Admin</h4></Col>
          <Col><h4>{user.username}</h4></Col>
          <Col className='d-flex justify-content-center'><Link to='/admin/create'><Button variant='outline-success' className=''>&#10010; Create User</Button></Link></Col>
          <Col className='d-flex justify-content-center'><Button variant='danger' onClick={logoutAdmin} className='w-md-50'>Logout</Button></Col>
      </Row>
    </div>
  )
}

export default AdminHeader