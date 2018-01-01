function validate(values){
    const errors = {}
    let regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    let pass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    if (!values.username){
        errors.username = "Username invalide"
    }
    else if (values.username.length > 12 || values.username.length <= 2){
        errors.username = "Taille username"
    }
    if (!(regex).test(values.email))  
    {  
        errors.email = "Email invalide"
    } 
    if (!values.prenom){
        errors.prenom = "Prenom invalide"
    }
    else if (values.prenom.length > 20){
        errors.prenom = "Taille prenom"
    }
    if (!values.nom){
        errors.nom = "Nom invalide"
    }
    else if (values.nom.length > 20){
        errors.nom = "Taille nom"
    }
    if (!(pass).test(values.password)){
        errors.password = "Password invalide"
    }
    if (values.password != values.confirm){
        errors.confirm = "Vos passwords ne sont pas identique"
    }
    return errors
}

export default validate