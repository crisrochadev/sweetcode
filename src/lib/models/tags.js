
import getSheet from "./connectSpreadSheet";
async function allTags() {
    const sheet = await getSheet('tags')
    const rows = await sheet.getRows();
    const posts = rows.map(tag => ({
        id: tag.id,
        name: tag.name ? tag.name : '',
        bg: tag.bg ? tag.bg : '',
        color: tag.color ? tag.color : '',
        icon: tag.icon ? tag.icon : '',
    }))


    return posts;
}
export async function getAllTags(){
    return await allTags()
}