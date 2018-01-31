let itsort = (tab, index) => {
    for (let i = 0; i < tab.length; i++){
        console.log("ooo")
        if (i < tab.length - 1 && tab[i].info[index] > tab[i].info[index])
        {
            return (0)
        }
    }
    return (1)
}

let sorttab = (tab, index) =>{
    while (itsort(tab, index) === 0){
    for (let i = 0; i < tab.length; i++){
        if (i < tab.length - 1 && tab[i].info[index] > tab[i + 1].info[index])
        {
            let t = tab[i].info[index];
            tab[i].info[index] = tab[i + 1].info[index];
            tab[i + 1].info[index] = t;
        }
    }
}
console.log(tab)
}

module.exports = sorttab