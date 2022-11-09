import Posts from "@lib/controllers/Posts";

export default async function handlePosts(req, res) {
    let response = {
        status: 401,
        result: {
            message: 'Verifique os dados da requisição'
        }
    }
    const { method } = req
    switch (method) {
        case 'GET':
            const arg = req.query.arg
            if (arg !== undefined) {
                if (arg === 'slug') {
                    try {
                        response = await Posts.getSlugs();
                    } catch (err) {
                        response = {
                            status: 500,
                            result: {
                                message: err
                            }
                        }
                    }
                }
            }
            else {
                try {
                    response = await Posts.getAllPosts();
                } catch (err) {
                    response = {
                        status: 500,
                        result: {
                            message: 'ola mundo'
                        }
                    }
                }
            }
            break;
        case 'POST':
            response = await Posts.createPost(req.body)
            break;
        case 'PUT':
            console.log(req.query)
            response = await Posts.publishPost(req.body, req.query.post_id)

            break;
        default:
            response = {
                status: 401,
                result: {
                    message: 'Verifique o método da requisição'
                }
            }
            break;
    }

    res.status(response.status).json(response.result)
}