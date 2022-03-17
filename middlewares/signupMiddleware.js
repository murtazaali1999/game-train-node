module.exports = {
    signupMiddleware: async(req,res,next)=>{
        const {name,age,email,password} = req.body;

        if( name && age && email && password ){
           return next();
        }
        return res.status(400).json({message:"one or more fields are missing"});
    }
}