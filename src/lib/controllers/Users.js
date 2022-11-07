import connectSpreadSheet from "@lib/models/connectSpreadSheet"
import bcrypt from 'bcrypt'
export default {
    async getUsersByLogin(data) {
        const { rowsUsers } = await connectSpreadSheet('users')

        // const hash = await bcrypt.hash('Vini2106#', 10).then(function(hash) {
        //     return hash
        // });
        // console.log(hash)
        // console.log(rowsUsers)
        const user = rowsUsers.find(user => user.email === data.email);
        if (user) {
            const res = await bcrypt.compare(data.pass, user.password).then(result => {
                if (result) {
                    return {
                        status: 200,
                        result: {
                            id: user.id,
                            token:user.accessToken,
                            photoURL:user.photoURL,
                            message: 'Usuario autenticado'
                        }
                    }
                } else {
                    return {
                        status: 201,
                        result: {
                            id: null,
                            error:2,
                            message: 'Senha errada!'
                        }
                    }
                }
            })

            return res;
        } else {
            return {
                status: 201,
                result: {
                    id: null,
                    error:1,
                    message: 'Email errado!'
                }
            }
        }
    },
    async getUserByToken(token) {
        const { rowsUsers } = await connectSpreadSheet('users')
        const user = rowsUsers.find(user => user.accessToken === token)
        if(user){
            return {
                status:200,
                result:{
                    user:user
                }
            }
        }
        else{
            return {
                status:201,
                result:{
                    user:null
                }
            }
        }
    }
}