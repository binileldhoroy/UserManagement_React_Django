import React, { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Nav, Tab } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext';
import AdminHeader from '../admin/AdminHeader';
import AdminEdit from './AdminEdit';
import AdminCreate from './AdminCreate';

const AdminHome = () => {
    const { getUsers, users, userDetails,deleteUser } = useContext(AuthContext);

    useEffect(() => {
        getUsers()
    } , [])

  return (
    <Container>
    <AdminHeader />
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>

  <tbody>
    
          {users && users.map((user, index) => {
              return (
       
          
    <tr>
      <th scope="row" key={index}>{index}</th>
      <td>{user.name}</td>
      <td>{user.username}</td>
    <td>
      <Button variant='outline-warning' onClick={userDetails} value={user.id} className='w-100' >Edit</Button>
      </td>
      <td>
      <Button variant='outline-danger' onClick={deleteUser} value={user.id} className='w-100' >Delete</Button>
      </td>
    </tr>
    
    
    
    )})}
   
    </tbody>
  </table>
    </Container>
  )
}

export default AdminHome