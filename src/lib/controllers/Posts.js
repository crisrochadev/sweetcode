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
    },
    async createPost(post) {
        const { nextRowId, sheet } = await connectSpreadSheet('posts')
        const newPost = {
            id: nextRowId,
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            thumbnail: post.thumbnail,
            tags: JSON.stringify(post.tags),
            category: post.category,
            is_public: false,
            date: new Date(Date.now()),
            slug: post.title.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-'),
            author: post.author
        }
        const res = await sheet.addRow(newPost)
        return {
            status: 200,
            result: {
                id: res.id
            }
        }
    },
    async publishPost(data,id){
            const {rows} = await connectSpreadSheet('posts')
            const row = rows.find(row => row.id === id)
            const index = rows.indexOf(row)
            let newRow = rows[index]
            for (let key in newRow) {
                for (let keyData in data) {
                    if (key === keyData) {
                        newRow[key] = data[keyData]
                    }

                }

            }
            console.log(id)
            console.log(newRow)
            // console.log(rows)
            rows[index] = newRow;
            const result = await rows[index].save();
            return  {
                status: 200,
                result: result
            }
    }
}