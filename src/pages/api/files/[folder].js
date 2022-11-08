import Files from "@lib/controllers/Files";




export const config = {
  api: {
      bodyParser: {
          sizeLimit: '10mb' // Set desired value here
      }
  }
}

export default async function handlerImage(req, res) {
  const method = req.method;
    switch (method) {
    case "GET":
      const files= await Files.getImages()
      res.send(files)
      break;
    case "POST":
      const file = req.body.image
      // console.log(file)
      const folder = req.query.folder
      const image = await Files.createImage(folder,file)
      res.status(200).json(image)
      
      break;
  }
}