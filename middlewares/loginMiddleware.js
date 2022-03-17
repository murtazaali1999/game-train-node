module.exports = {
    loginMiddleware: async(req,res,next)=>{
        const {email,password} = req.body;

        if( email && password ){
           return  next();
        }
        return res.status(400).json({message:"one or more fields are missing"});
    }
}