const UserModel = require('../models/userModel.js')

const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const registerUser = async function(req,res){
    try{ 
        const requestBody = req.body;
        let username = req.params.user_name
        const newUser = await UserModel.create({user_name:username});
        return res.status(200).send({status:true,Message:'User created successfully',data:newUser})

    }catch(error){
        return res.status(500).send({status:false,Message:error.message})
    }
}
//****************************Get user */
const getUser = async(req, res) => {
    try {
        let username = req.params.user_name
        // let checkId = isValidObjectId(productId)
        // if (!checkId) {
        //     return res.status(400).send({ status: false, message: "Please Provide a valid productId " });;
        // }
        let userFound = await UserModel.findOne({ user_name:username  }).select({_id:0,updatedAt:0,__v:0})

        if (!userFound) {
            return res.status(404).send({ status: false, msg: "There is no user with this name" });
        }
        return res.status(200).send({ status: true, message: 'User Details', data: userFound });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}


module.exports={registerUser,getUser}