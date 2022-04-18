import React, { useContext, useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthContext from '../../context/AuthContext'
import swal from 'sweetalert'
import './SignUp.css'

const schema = yup.object().shape({
  name: yup.string().required() ,
  username: yup.string().min(3).required(),
  email:  yup.string().email().required(),
  password: yup.string().min(6).max(15).required() ,
  repassword: yup.string().oneOf([yup.ref('password'),null]) ,
})

const SignUp = () => {
  const history = useHistory()
  const {setErrorMsg,errorMsg} = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  })

  let SinupUser = async (e) => {
      let response = await axios.post('http://127.0.0.1:8000/api/signup/', {
          first_name: e.name,
          username: e.username,
          email:e.email,
          password:e.password
        })
        
      let status = response.data.status
      if(status === 'success'){
        swal("Successfully Registered!");
          history.push('/login')
      }else{
        setErrorMsg(response.data.username[0])
      }
  }

  return (
    <div >
      <section className="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleSubmit(SinupUser)}>

                <div className="form-outline mb-4">
                  <input type="text" className="form-control form-control-lg" name='name' {...register('name')}  />
                  <label className="form-label" >Your Name</label>
                  <p style={{color:'red'}} >{errors.name?.message}</p>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" className="form-control form-control-lg" name='username' {...register('username')} />
                  <label className="form-label" >Username</label>
                  <p style={{color:'red'}}>{errors.username?.message}{errorMsg}</p>
                </div>

                <div className="form-outline mb-4">
                  <input type="Email" id="form3Example3cg" className="form-control form-control-lg" name='email' {...register('email')} />
                  <label className="form-label" >Email</label>
                  <p style={{color:'red'}}>{errors.email?.message}</p>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" name='password' {...register('password')} />
                  <label className="form-label" >Password</label>
                  <p style={{color:'red'}}>{errors.password?.message}</p>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" className="form-control form-control-lg" name='repassword' {...register('repassword')} />
                  <label className="form-label" >Repeat your password</label>
                  <p style={{color:'red'}}>{errors.repassword && 'Password should Match!'}</p>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>
              

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to='/login'  className="fw-bold text-body"><u>Login here</u></Link></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default SignUp
