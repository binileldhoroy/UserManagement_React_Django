import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const AdminEdit = () => {
    
    const { userEdit, updateUser } = useContext(AuthContext);

  return (
    <div>
        {console.log('hyname',userEdit)}
      <Row className='vh-100 align-items-center justify-content-center card py-5'>
        <Col xs='12' md='9' lg='4' className='border my-1 bg-light p-5'>
        <Form onSubmit={updateUser}>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='name' defaultValue={userEdit?.name}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name='username' defaultValue={userEdit?.username}/>
        </Form.Group>

        <Row className='pt-3'>
            <Col xs='6' className='d-flex justify-content-center'>
                <Link to='/admin/home' className='w-75'>
            <Button variant="outline-primary" type="button" className='w-100'>
                Back
            </Button>
                </Link>
            </Col>
            <Col xs='6' className='d-flex justify-content-center'>
            <Button variant="outline-success" type="submit" className='w-75'>
                Save
            </Button>
            </Col>
        </Row>
        </Form>
        </Col>
      </Row>
    </div>
  )
}

export default AdminEdit