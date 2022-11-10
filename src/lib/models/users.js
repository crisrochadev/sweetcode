import getSheet from "./connectSpreadSheet";
async function allUsers() {
    const sheet = await getSheet('users')
    const rows = await sheet.getRows();
    const users = rows.map(tag => ({
        id: tag.id,
        accessToken: tag.accessToken ? tag.accessToken : '',
        displayName: tag.displayName ? tag.displayName : '',
        email: tag.email ? tag.email : '',
        password: tag.password ? tag.password : '',
        emailVerified: tag.emailVerified ? tag.emailVerified : '',
        phoneNumber: tag.phoneNumber ? tag.phoneNumber : '',
        photoURL: tag.photoURL ? tag.photoURL : '',
        providerId: tag.providerId ? tag.providerId : '',
        permission: tag.permission ? tag.permission : '',
    }))


    return users;
}
export async function getUsersByLogin(data) {
    const  rowsUsers  = await allUsers();
    const user = rowsUsers.find(user => user.email === data.email);
    return user;
}
export async function getUserByToken(token) {
    const  rowsUsers  = await allUsers();
    const user = rowsUsers.find(user => user.accessToken === token)
    return user;
}