const SubscriptionModel = require('../models/subscriptionModel.js')
const UserModel = require('../models/userModel.js')
// Validations////////*////
const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidPlan = function(plan_id){
    return ["FREE","TRIAL","LITE_1M","PRO_1M","LITE_6M","PRO_6M"].indexOf(plan_id) !== -1
}
const dateRegex = (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)

//******************************Create Api */

const newSubs = async function(req,res) {
    try {
        let status = "SUCCESS"
        let requestBody = req.body;
        let planArr = ["FREE","TRIAL","LITE_1M","PRO_1M","LITE_6M","PRO_6M"]
        let arr =[["infinite",0],[7,0],[30,100],[30,200],[180,500],[180,900]]
        
        if(!isValidRequestBody(requestBody)){
            return res.status(400).send({ status: false, Message: "Invalid request,body can't be empty" })
        }
        const {user_name, plan_id,start_date} = requestBody;
        if(!isValid(user_name)){
            return res.status(400).send({status:false,Message:"User Name is required"})
        }
        let validUser = await UserModel.findOne({user_name:user_name})
        if(!validUser){
            return res.status(400).send({status:false,Message:"User with this name doesn't exsist"})

        }
        if(!isValid(plan_id)){
            return res.status(400).send({status:false,Message:"Plan Id is required"})

        }
        if(!isValidPlan(plan_id)){
            return res.status(400).send({status:false,Message:"This Plan Id doesn't exsist"})

        }
        if(!isValid(start_date)){
            return res.status(400).send({status:false,Message:"Date is required"})

        }
        if(!dateRegex.test(start_date)){
            return res.status(400).send({status:false,Message:"Date is in incorrect format"})
        }
        let amount;
        let validTill
        for(let i=0;i<planArr.length;i++){
            if(planArr[i]==plan_id){
            amount= arr[i][1]
            let future = new Date(start_date);
            future.setDate(future.getDate() +arr[i][0] );
            validTill = future
            }

        }
        const savedData = {status,plan_id,amount,start_date,validTill,user_name}
        const subsData = await SubscriptionModel.create(savedData)
        return res.status(200).send({status:true,msg:"Created",data:subsData})

    }catch(error){
        return res.status(500).send({status:false,Message:error.message}) 
    }
}
module.exports = {newSubs}
      
            
        
        