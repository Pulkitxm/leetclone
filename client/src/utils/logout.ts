function setCookie(cname:string, cvalue:string, exMins:number) {
    const d = new Date();
    d.setTime(d.getTime() + (exMins*60*1000));
    const expires = "expires="+d.toUTCString();  
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default function logout() {
    setCookie("token","",0);
}