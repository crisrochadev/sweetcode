import Pages from "@lib/controllers/Pages";


export default async function handlePages(req, res) {
    let response = {
        status: 401,
        result: {
            message: 'Verifique os dados da requisição'
        }
    }
    const { page_slug } = req.query
    response = await Pages.getPageBySlug(page_slug);

    res.status(response.status).json(response.result)
}