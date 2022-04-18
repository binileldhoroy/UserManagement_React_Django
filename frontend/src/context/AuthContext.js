import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [users, setUsers] = useState([])
    const [userEdit,setUserEdit] = useState([])
    const [errorMsg,setErrorMsg] = useState('')

    const history = useHistory()

    let loginUser = async (e )=> {
        
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.username, 'password':e.password})
        })
        let data = await response.json()
        console.log(data.data);
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history.push('/')
        }else{
            alert('Something went wrong!')
        }
    }

    const loginAdmin = async (e)=>{
        const response = await axios.post('http://127.0.0.1:8000/api/token/',{
            'username' : e.username,
            'password' : e.password
        })
        if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            // setErrorLogin(null)
            history.push('/admin/home');
        }else{
            alert('wrong')
            // setErrorLogin('Username or Password is error')
        }
    }

    const getUsers = async () => {
        console.log('haii');
        const data = await axios.post('http://localhost:8000/api/get-user/',{},{
            headers: {
              Authorization: `Bearer ${authTokens.access}`
            }
          })
          
          setUsers(data.data);
        }

    const createUser = async (e)=>{
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/signup/',{
            'first_name' : e.target.name.value,
            'username' : e.target.username.value,
            'password' : e.target.password.value
        },{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
        if (response.status === 200) {
            getUsers();
            history.push('/admin/home')
        }
    }

    const updateUser = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/updateuser/',{
            'id' : userEdit.id,
            'name' : e.target.name.value,
            'username' : e.target.username.value,
        },{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
        if (response.data.status === 'true') {
            setUserEdit(null);
            history.push('/admin/home');
        }
    }

    const userDetails = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/userdetails/',{
            'id' : e.target.value,
        },{
            headers: {
              Authorization: `Bearer ${authTokens.access}`
            }
          })
          const singleUser = response.data.data
        setUserEdit(singleUser);
        console.log(singleUser);
        history.push('/admin/edit');
    }

    const deleteUser = async (e) => {
        e.preventDefault();

        swal({
            title: "Are you sure?",
            text: "Are you sure  you want to delete this user?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then( async (willDelete) => {
            if (willDelete) {
              
              swal("User Deleted", {
                icon: "success",
              });
              const response = await axios.post('http://localhost:8000/api/deleteuser/',{
                'id' : e.target.value,
            },{
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                  }
            })
            setUsers(response.data);
   
            } 
          })

              
        
    }

    let logoutUser = (e) => {
        e.preventDefault()
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              
              swal("You successfully Logout", {
                icon: "success",
              });
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem('authTokens')
                history.push('/login')
            } 
          })
    }


    let logoutAdmin = () => {

        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              
              swal("You successfully Logout", {
                icon: "success",
              });
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem('authTokens')
                history.push('/admin/login')
            } 
          })

        
    }


    let contextData = {
        user:user,
        users:users,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        loginAdmin:loginAdmin,
        logoutUser:logoutUser,
        logoutAdmin:logoutAdmin,
        getUsers:getUsers,
        createUser:createUser,
        updateUser:updateUser,
        userDetails:userDetails,
        deleteUser:deleteUser,
        userEdit:userEdit,
        errorMsg:errorMsg,
        setErrorMsg:setErrorMsg
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)


    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
