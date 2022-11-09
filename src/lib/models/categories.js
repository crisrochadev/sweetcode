
  import getSheet from "./connectSpreadSheet";

async function allCategories(){
    const sheet = await getSheet('categories')
    const rows = await sheet.getRows(); 
    const posts = rows.map(category => ({
        id:category.id,
        name:category.name ? category.name : '',
        bg:category.bg ? category.bg : '',
        color:category.color ? category.color : '',
        icon:category.icon ? category.icon : '',
        excerpt:category.excerpt ? category.excerpt : '',
        slug:category.slug ? category.slug : '',
      }))

    return posts;
}
export async function getAllCategories(){
  const rows = await  allCategories();
  return{
      status:200,
      result:{
          categories:rows
      }
  }
}