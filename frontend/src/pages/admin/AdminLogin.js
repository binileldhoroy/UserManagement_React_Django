import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required() ,
  })

function AdminLogin() {

    const { loginAdmin} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
      })

    return (
        <div className="vh-100 p-0 p-sm-6 d-flex align-items-center bg-light">
            <div className="card w-25x flex-grow-1 flex-sm-grow-0 m-sm-auto">
                <form onSubmit={handleSubmit(loginAdmin)}>
                <div className="card-body mx-sm-3 flex-grow-0">
                    <h1 className="mb-0 fs-3">Sign In</h1>
                    <div  className="fs-exact-14 text-muted mt-2 pt-1 mb-4 pb-2">Log in to your account to continue.</div>
                    <div className="mb-3"><label className="form-label">Username</label>
                    <input type="text" {...register('username')} className="form-control form-control-lg" name="username"  /></div>
                    <p style={{color:'red'}} >{errors.username?.message}</p>
                    <div className="mb-4"><label className="form-label">Password</label>
                    <input type="password" {...register('password')} className="form-control form-control-lg" name="password" /></div>
                    <p style={{color:'red'}} >{errors.password?.message}</p>
                    <div className="py-2"><button type="submit" className="btn btn-primary btn-lg w-100">Sign In</button></div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin