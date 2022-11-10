import { getAllCategories } from './categories';
import getSheet from './connectSpreadSheet';
import connectSpreadSheet from './connectSpreadSheet';


async function allPosts(){
    const sheet = await getSheet('posts')
    const rows = await sheet.getRows(); 
    const posts = rows.map((post) => (({
        id:post.id,
        content:post.content ? post.content : '<p>Ooops, algo deu errado, volte a página inicial</p>',
        title:post.title ? post.title : '',
        date:post.date ? post.date : '',
        author:post.author ? post.author : '',
        excerpt:post.excerpt ? post.excerpt : '',
        thumbnail:post.thumbnail ? post.thumbnail : '',
        tags:post.tags ? JSON.parse(post.tags) : [] ,
        category:post.category ? post.category : '',
        slug:post.slug ? post.slug : '',
        is_public:post.is_public
    })))

    return posts;
}
export async function getAllPosts(){
    return await allPosts();
}
export async function getPostBySlug(slug){
    const rows = await allPosts();
    const post =  rows.find(post => post.slug === slug)
    console.log(rows)
    return post
}
export async function getPostsByCategory(category){
    const rows = await allPosts();
    const rowsCategories  = await getAllCategories();
    const categories = rowsCategories.find(ct => ct.slug === category)
    const posts = rows.filter(post => post.category === categories.id)
    const currentCategory = categories

    return {
        posts,currentCategory
    }
}
export async function getSlugs(){
    const rows = await allPosts();
    const slugs = rows.map(row => row.slug)
    return slugs
}
export async function createPost(post) {
    const sheet = await getSheet('posts')
    const nextRowId = rows.length + 1

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
    return res.id
}
export async function publishPost(data,id){
    const sheet = await getSheet('posts');
    const rows = sheet.getRows();
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

    rows[index] = newRow;
    const result = await rows[index].save();
    return  result
}