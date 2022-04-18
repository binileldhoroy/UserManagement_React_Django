import React, { useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'



const schema = yup.object().shape({
    name: yup.string().required() ,
    username: yup.string().min(3).required(),
    email:  yup.string().email().required(),
    password: yup.string().min(6).max(15).required() ,
    repassword: yup.string().oneOf([yup.ref('password'),null]) ,
  })

const AdminCreate = () => {

    const { createUser,setErrorMsg,errorMsg } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
      })

  return (
    <div>
      <Row className='vh-100 align-items-center justify-content-center card py-5'>
        <Col xs='12' md='9' lg='4' className='border my-1 bg-light p-5'>
        <Form onSubmit={handleSubmit(createUser)}>

        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control {...register('name')} type="text" placeholder={"Enter Name"} name='name' />
            <p style={{color:'red'}} >{errors.name?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control {...register('username')} type="text" placeholder="Enter Username" name='username' />
            <p style={{color:'red'}}>{errors.username?.message}{errorMsg}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Email</Form.Label>
            <Form.Control {...register('username')} type="text" placeholder="Enter Email" name='email' />
            <p style={{color:'red'}}>{errors.email?.message}</p>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control {...register('password')} type="password" placeholder="Enter Password" name='password' />
            <p style={{color:'red'}}>{errors.password?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Conform Password</Form.Label>
            <Form.Control {...register('repassword')} type="password" placeholder="Conform Password" name='password2' />
            <p style={{color:'red'}}>{errors.repassword && 'Password should Match!'}</p>

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
                Create
            </Button>
            </Col>
        </Row>
        </Form>
        </Col>
      </Row>
    </div>
  )
}

export default AdminCreate