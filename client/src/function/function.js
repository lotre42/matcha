export let itsort = (tab, index) => {
    for (let i = 0; i < tab.length; i++){
        if (i < tab.length - 1 && tab[i].info[index] > tab[i + 1].info[index])
        {
            return (0)
        }
    }
    return (1)
}

export let itsort2 = (tab, index) => {
    for (let i = 0; i < tab.length; i++){
        if (i < tab.length - 1 && tab[i].info[index] < tab[i + 1].info[index])
        {
            return (0)
        }
    }
    return (1)
}