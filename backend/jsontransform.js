
let jsontransform = (user) =>{
    let ret = {
        "info": {},
        "tag": {}
    }
    let i = 0;
    for (var prop in user) {
        if (i < 15 || i === 25){
             ret.info[prop] = `${user[prop]}`;
        }
        else{
            ret.tag[prop] = `${user[prop]}`;
        }
        i++;
    }
    return ret    
}

module.exports = jsontransform