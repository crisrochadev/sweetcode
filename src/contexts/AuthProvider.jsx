import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { setCookie,parseCookies } from 'nookies'
import { useRouter } from "next/router";

export const AuthContext = createContext({})


export default function AuthProvider({children}){
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState({type:null,message:null})
    const router = useRouter()
    const getUserByToken = async (token) =>{
        const res = await axios.get('/api/users',{
            headers:{
                Authorization:token
            }
        }).then(res => res.data)

       if(res.user === null){
        router.push('/')
       }
       else {
        setUser(res.user)
       }
    }
    useEffect(() => {
        const cookies = parseCookies();
         getUserByToken(cookies['AUTH_TOKEN'])
    },[])
    const signin = async  data => {
        setLoading(true)
        const res = await axios.post('/api/users',data).then(res => res.data)
        console.log(res)
        if(res.id === null){
            setMessage({
                type:res.error,
                message:res.message
            })
            setLoading(false)
        }else{
            setCookie(null,'AUTH_TOKEN',res.token,{
                maxAge:86400 * 7,
                path:'/'
            })
            setUser({id:res.id})
            router.push('admin/'+user.id)
        }

    }
    return(
        <AuthContext.Provider value={{user,signin,loading,message}}>
            {children}
        </AuthContext.Provider>
    )
}
