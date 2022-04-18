import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './LoginPage.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required() ,
})

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }} = useForm({
      resolver: yupResolver(schema),
    })
    
    return (
      <div className='container-fluid '>
        <div className='d-flex justify-content-center' style={{marginLeft:'20rem'}}>
      <section className="vh-100 ">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 text-black">


        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5" style={{border:'1px solid black'}}>

          <form style={{width: "50rem"}} onSubmit={handleSubmit(loginUser)}>

            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Log in</h3>

            <div className="form-outline mb-4">
              <input type="text" name='username' id="form2Example18" className="form-control form-control-lg" {...register('username')} />
              <label className="form-label" >UserName</label>
              <p style={{color:'red'}} >{errors.username?.message}</p>
            </div>

            <div className="form-outline mb-4">
              <input type="password" name='password' id="form2Example28" {...register('password')} className="form-control form-control-lg" />
              <label className="form-label" >Password</label>
              <p style={{color:'red'}} >{errors.password?.message}</p>
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
            </div>

            <p>Don't have an account? <Link to='/signup'  className="link-info">Register here</Link></p>

          </form>

        </div>

      </div>
    </div>
  </div>

</section>
</div>
    </div>
    )
}

export default LoginPage
