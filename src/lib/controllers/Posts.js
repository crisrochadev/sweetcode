import { getAllCategories } from "@lib/models/categories";
import connectSpreadSheet from "@lib/models/connectSpreadSheet"
import { createPost, deletePost, getAllPosts,getPostById,getPostBySlug, getPostsByCategory, getSlugs, updatePost } from "@lib/models/posts.js";
import { getAllTags } from "@lib/models/tags";

//Add muita coisa Aqiui
export default {
    async getAllPosts(){
        const rowsPosts = await getAllPosts();
        const rowsTags = await getAllTags();
        const rowsCategories  = await getAllCategories();
        const posts = rowsPosts.map(row => {
            if(row.is_public){
                return {
                    id:row.id,
                    title:row.title,
                    is_public:row.is_public,
                    slug:row.slug,
                    date:row.date,
                    author:row.author,
                    excerpt:row.excerpt,
                    thumbnail:row.thumbnail,
                    tags:row.tags,
                    category:row.category,
                }
            }
        }).filter(p => p !== undefined)
        // console.log(posts)
        return{
            status:200,
            result:{
                posts:posts
            }
        }
    },

    async getPostsAdmin(){
        const posts = await getAllPosts()
        // console.log(posts)
        return {
            status:200,
            result:{
                posts:posts
            }
        }
    },
    async getPostBySlug(slug){
        const post = await getPostBySlug(slug);
        return{
            status:200,
            result:{
                post:post
            }
        }
    },
    async getPostsByCategory(category){
        const { posts, currentCategory } = await getPostsByCategory(category)

        return{
            status:200,
            result:{
                posts:posts,
                category:currentCategory
            }
        }
    },
    async getSlugs(){
        const slugs = await getSlugs();
        return{
            status:200,
            result:{
                slugs:slugs,
            }
        }
    },
    async createPost(post) {
       const id = await createPost(post)
        return {
            status: 200,
            result: {
                id: id
            }
        }
    },
    async publishPost(data,id){
            const result = await updatePost(data,id)
            return  {
                status: 200,
                result: result
            }
    },
    async deletePost(id){
        const res = await deletePost(id)
        return {
            status:200,
            result:{
                res:res
            }
        }
    },
    async getPostById(id){
        const post = await getPostById(id);
        return{
            status:200,
            result:{
                post:post
            }
        }
    }
}