function auth(req,res,next){
    if(req.session?.user.username !== 'Mathias' || !req.session?.admin){
        return res.status(401).send('No hay autorizacion de administrador')
    }
    return next()
}

export default auth;