import { getPageBySlug, getSlugsPages } from "@lib/models/pages"

export default {
    async getPageBySlug(slug) {
        const page = await getPageBySlug(slug)

        return {
            status: 200,
            result: {
                page: page
            }
        }
    },
    async getSlugsPages(){
        const slugs = await getSlugsPages();
        return {
            status: 200,
            result: {
                slugs: slugs
            }
        }
    }

}