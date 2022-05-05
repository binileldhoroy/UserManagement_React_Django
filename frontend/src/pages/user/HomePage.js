import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import useAxios from '../../utils/useAxios'
import Header from '../../components/Header'


const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    let api = useAxios()

    useEffect(()=> {
        getNotes()
    }, [])


    let getNotes = async() =>{
        let response = await api.get('/api/notes/')

        if(response.status === 200){
            setNotes(response.data)
        }
        
    }

    return (
        <div>
            <Header/>


         
                {notes.map(note => (
                    <div className="card d-flex p-2" style={{width: "18rem"}}>
                    <img src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3BlbiUyMGJvb2t8ZW58MHx8MHx8&w=1000&q=80" class="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">{note.body}</p>
                    </div>
                    </div>
                    
                ))}
           
        </div>
    )
}

export default HomePage
