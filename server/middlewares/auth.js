export const ensureAuth = (req, res, next)=> {
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("http://localhost:3000/register")
    }
}

export const ensureGuest = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect("http://localhost:3000/dashboard")
    }
    else{
        return next()
    }
};