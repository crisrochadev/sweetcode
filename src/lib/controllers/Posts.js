import connectSpreadSheet from "@lib/models/connectSpreadSheet"
import { createPost, getAllPosts,getPostBySlug, getPostsByCategory, getSlugs, publishPost } from "@lib/models/posts.js";

//Add muita coisa Aqiui
export default {
    async getAllPosts(){
        const rowsPosts = await getAllPosts();
        const { rowsTags } = await connectSpreadSheet('tags')
        const { rowsCategories } = await connectSpreadSheet('categories')
        const posts = rowsPosts.map(row => {
            if(row.is_public === 'TRUE'){
                return {
                    id:row.id,
                    title:row.title,
                    is_public:row.is_public,
                    slug:row.slug,
                    date:row.date,
                    author:row.author,
                    excerpt:row.excerpt,
                    thumbnail:row.thumbnail,
                    tags:row.tags.map(tagId =>  rowsTags.find(tg => tg.id === tagId)).filter(t => t !== undefined),
                    category:row.category !== '' ? rowsCategories.find(category => category.id === row.category) : {},
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
            const result = await publishPost(data,id)
            return  {
                status: 200,
                result: result
            }
    }
}