export const getProfileImage = (file:any) => {
    if(file && typeof file == "string") return false;
    if(file && typeof file == "object") return file.url;

    return require ("../assets/images/defaultAvatar.png");

}