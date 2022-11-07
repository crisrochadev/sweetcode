import Users from "@lib/controllers/Users"

export default async function(req,res){
    let response = {
        status:401,
        result:{
            message:"Verifique os dados da requisição"
        }
    }
    const {method} = req
    const data = req.body
    if(method === 'POST'){
        response = await Users.getUsersByLogin(data)
    }
    if(method === 'GET'){
        const token = req.headers.authorization
        if(token) {
            
        response = await Users.getUserByToken(token)
        }
    }
    res.status(response.status).json(response.result)
}