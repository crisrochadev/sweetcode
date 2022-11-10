import { getAllCategories } from './categories';
import getSheet from './connectSpreadSheet';
import { getAllTags } from './tags';


async function allPosts(){
    const sheet = await getSheet('posts')
    const rows = await sheet.getRows(); 
    const rowsTags = await getAllTags();
    const rowsCategories = await getAllCategories();
    const posts = rows.map((post) => {
        const getTags = post.tags ? JSON.parse(post.tags) : []

        return {
            id:post.id,
            content:post.content ? post.content : '<p>Ooops, algo deu errado, volte a página inicial</p>',
            title:post.title ? post.title : '',
            date:post.date ? post.date : '',
            author:post.author ? post.author : '',
            excerpt:post.excerpt ? post.excerpt : '',
            slug:post.slug ? post.slug : 'error',
            thumbnail:post.thumbnail ? post.thumbnail : '',
            // tags:post.tags ? JSON.parse(post.tags) : [] ,
            tags:getTags.map(tagId =>  rowsTags.find(tg => tg.id === tagId)).filter(t => t !== undefined),
            category:post.category !== undefined ? rowsCategories.find(category => category.id === post.category) : {},
            is_public:post.is_public === 'TRUE' ? true : false
        }
    })
    //  console.log(posts)
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
    if(post.id) {
        // console.log(post)
        let newData = {}
        for(let [key,value] of Object.entries(post)){
            
            if(key !== 'id') newData[key] = value;
            if(key === 'category') newData[key] = value.id
            if(key === 'tags') newData[key] = JSON.stringify(value)
        }

        updatePost(newData,post.id)
        return;
    }
    const sheet = await getSheet('posts')
    const rows = await sheet.getRows();
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
export async function updatePost(data,id){
    const sheet = await getSheet('posts');
    const rows = await sheet.getRows();
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
    return  rows[index].id
}
export async function deletePost(id){
    const sheet = await getSheet('posts');
    const rows = await sheet.getRows();
    const row = rows.find(row => row.id === id)
    const index = rows.indexOf(row)
    const result = await rows[index].delete();
    return  result
}
export async function getPostById(id){
    const rows = await allPosts();
    const post = rows.find(post => post.id ==id)
    // console.log(post)
    return post;
}