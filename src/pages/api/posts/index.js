import Posts from "@lib/controllers/Posts";

export default async function handlePosts(req,res){
    const response = {
        status:401,
        result:{
            message:'Verifique os dados da requisição'
        }
    }
    const {method} = req
    switch(method){
        case 'GET':
            try {
                response = Posts.getAllPosts();
              } catch (err) {
                response = {
                    status:500,
                    result:{
                        message: err
                    }
                }
              }
        break;
        default:
            response = {
                status:401,
                result:{
                    message:'Verifique o método da requisição'
                }
            }
        break;
    }

    res.status(response.status).json(response.result)
}