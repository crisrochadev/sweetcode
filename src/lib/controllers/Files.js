import cloudinary from '../../../cloudinaryConfig';

export default {
    async createImage(folder, file) {
        const upload = await cloudinary.v2.uploader.upload(file,
            {
                folder: "sweet-" + folder + 's',
                resource_type: folder
            });
        return {
            files: upload || [], // {array} The names of uploaded files.
            path: upload.secure_url, // {string} Real relative path
            baseurl: upload.secure_url, // {string} Base url for filebrowser
            error: 'Deu ruim', // {int}
            message: 'Deu boa'// {string}
        }

    },
    async getImages(){
        const result = await cloudinary.v2.api.resources({ resource_type: req.query.folder }).then(res => {
            return res.resources.filter(item => item.folder === 'sweet-' + req.query.folder + 's')
          })

        return result;
    }
}