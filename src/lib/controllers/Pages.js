import connectSpreadSheet from "@lib/models/connectSpreadSheet"

export default {
    async getPageBySlug(slug) {
        const { rowsPages } = await connectSpreadSheet('pages')
        const page = rowsPages.find(page => page.slug === slug)

        return {
            status: 200,
            result: {
                page: page
            }
        }
    },
    async getSlugsPages(){
        const { rowsPages } = await connectSpreadSheet('pages')
        const slugs = rowsPages.map(row => row.slug)
        return {
            status: 200,
            result: {
                slugs: slugs
            }
        }
    }

}