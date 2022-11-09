import connectSpreadSheet from "@lib/models/connectSpreadSheet"
//Add um comentario aqui
export default {
    async getAllCategories(){
        const {rowsCategories } = await connectSpreadSheet('categories')
        return{
            status:200,
            result:{
                categories:rowsCategories
            }
        }
    }
}