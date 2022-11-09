import getSheet from "./connectSpreadSheet";

async function allPages(){
    const sheet = await getSheet('pages')
    const rows = await sheet.getRows(); 
    const posts = rows.map((page) => (({
        id:page.id,
        content:page.content ? page.content : '<p>Ooops, algo deu errado, volte a página inicial</p>',
        title:page.title ? page.title : '',
        date:page.date ? page.date : '',
        author:page.author ? page.author : '',
        excerpt:page.excerpt ? page.excerpt : '',
        thumbnail:page.thumbnail ? page.thumbnail : '',
        tags:page.tags ? JSON.parse(page.tags) : [] ,
        category:page.category ? page.category : '',
        slug:page.slug ? page.slug : '',
        is_public:page.is_public
      })))

    return posts;
}
   export  async  function getPageBySlug(slug) {
        const rows = await allPages();
        const page = rows.find(page => page.slug === slug)

        return page
    }
   export  async function getSlugsPages(){
    const rows = await allPages();
        const slugs = rows.map(row => row.slug)
        return slugs
    }

