export function setUserInfo(userInfo){
    window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function getUserInfo(){
    return JSON.parse(window.sessionStorage.getItem("userInfo"));
}