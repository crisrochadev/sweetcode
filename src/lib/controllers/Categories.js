import { getAllCategories } from "@lib/models/categories"
import connectSpreadSheet from "@lib/models/connectSpreadSheet"
//Add um comentario aqui
export default {
    async getAllCategories(){
       const categories = await getAllCategories();
        return{
            status:200,
            result:{
                categories:categories
            }
        }
    }
}