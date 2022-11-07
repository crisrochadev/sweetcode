import connectSpreadSheet from "@lib/models/connectSpreadSheet"

export default {
    async getAllPosts(){
        const { rowsPosts } = await connectSpreadSheet('posts')
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
        const { rowsPosts } = await connectSpreadSheet('posts');
        const post = rowsPosts.find(post => post.slug === slug)
        return{
            status:200,
            result:{
                post:post
            }
        }
    },
    async getPostsByCategory(category){
        const { rowsPosts } = await connectSpreadSheet('posts')
        const { rowsCategories } = await connectSpreadSheet('categories')
        const categories = rowsCategories.find(ct => ct.slug === category)
        const posts = rowsPosts.filter(post => post.category === categories.id)
        const currentCategory = categories

        return{
            status:200,
            result:{
                posts:posts,
                category:currentCategory
            }
        }
    }
}