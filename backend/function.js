
let jsontransform = (user) =>{
    let ret = {
        "info": {},
        "tag": {}
    }
    let i = 0;
    for (var prop in user) {
        if (i < 17 || i === 28){
             ret.info[prop] = `${user[prop]}`;
        }
        else if (user[prop] == 1){
            ret.tag[prop] = `${user[prop]}`;
        }
        i++;
    }
    return ret    
}


let parseTag = (tag) => {
    let ret = {};
    for (let prop in tag) {
        if (tag[prop] == 1)
            ret[prop] = `${tag[prop]}`;
    }
    return (ret)
}
module.exports = {jsontransform, parseTag}