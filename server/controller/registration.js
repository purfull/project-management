
const { where } = require("../db");

// updates staff
const Staff = require("../models/User/StaffUser");
const StaffUpdate = require("../models/User/StaffUser");
const deleteStaff = require("../models/User/StaffUser");

// updatecleint
const Client = require("../models/User/ClientUser");
const ClientUpdate = require('../models/User/ClientUser');
const Clientdelete = require('../models/User/ClientUser');

//update admin
const Admin = require("../models/User/AdminUser");
const adminUpdate = require('../models/User/AdminUser');
const admindelete = require("../models//User/AdminUser");


module.exports = {

 // starting  staffuserr

    getStaffById: async (req, res) => {
        const { id } = req.params;

        try {
            const getStaff = await Staff.findOne({ where: { id } });
            res.status(200).json({ data: getStaff, });
        } catch (error) {
            console.log("error", error);
            res.status(500).json({ message: "Failed to retrieve staff details" });
        }
    },
// end get staff

    createStaff: async (req, res) => {

        const {
            user_name,
            password,
            email,
            phone_number,
            user_role,
            staff_name,
            staff_phone,
            staff_email,
            profile_pic,
            address,
            city,
            state,
            postal_code,
            country

        } = req.body;

       

        try {
            const newstaff = await Staff.create({
                user_name,
                password,
                email,
                phone_number,
                user_role,
                staff_name,
                staff_phone,
                staff_email,
                profile_pic,
                address,
                city,
                state,
                postal_code,
                country
            })
            res.status(201).json({ data: newstaff, message: "staff created successfully" })
        }
        catch (error) {
            console.error("Error creating newstaff:", error);
            res.status(500).json({ message: "Failed to create staff" });
        }


    },  
//ending craete staff


// this is update for staffuser
     updateStaff: async (req, res) => {
        const {
            id,
            user_name,
            password,
            email,
            phone_number,
            user_role,
            staff_name,
            staff_phone,
            staff_email,
            profile_pic,
            address,
            city,
            state,
            postal_code,
            country
        } = req.body;

        try {
            const updateStaff = await StaffUpdate.update({
                id,
                user_name,
                password,
                email,
                phone_number,
                user_role,
                staff_name,
                staff_phone,
                staff_email,
                profile_pic,
                address,
                city,
                state,
                postal_code,
                country
            },
                {
                    where: { id }
                });


            res.status(201).json({ data: updateStaff.recordSet, message: "staff updated successfully" });
        } catch (error) {
            console.error("Error to staff update:", error);
            res.status(500).json({ message: "Failed to update staff" });
        }
    },
// update ending for staff user


// delete staff starting 

    deleteStaff: async (req, res) => {

        const { id } = req.body

        try {

            const result = await deleteStaff.update(

                { isActive: false },
                { where: { id } }
            )

            if (result[0] == 0) {

                return res.status(404).json({ message: 'Record not found' });
            }

            res.status(200).json({ message: 'Record marked as inactive', result: result[true] });
        }



        catch (error) {
            res.status(500).json({ message: 'Error occurred: ' + err.message });

        }

    },

// delete staff ending 



// staring cleint user
//get client 
    getClientId:async (req, res) =>{
        const {id} =req.params
        try{
            const getClient = await Client.findOne({where :{id}});
            res.status(200).json({data :getClient});
        }catch(error){
            console.log("error",error);
            res.status(500).json({message:"Failed to retrieve client details"})
        }
}, 
//end client 
//create client for client route 

    createclient: async (req, res) => {

        const {
            company_name,
            cp_name,
            user_name,
            password,
            cp_phone,
            cp_email,
            company_phone,
            company_email,
            company_logo,
            address,
            city,
            state,
            postal_code,
            country,


        } = req.body;

        try {
            const newclient = await Client.create({
                company_name,
                cp_name,
                user_name,
                password,
                cp_phone,
                cp_email,
                company_phone,
                company_email,
                company_logo,
                address,
                city,
                state,
                postal_code,
                country,
            })
            res.status(201).json({ data: newclient, message: "clientuser account created successfully" })
        }
        catch (error) {
            console.error("Error creating newclient:", error);
            res.status(500).json({ message: "Failed to create clientuser" });
        }

    }, 
//enidng creaete cliet route

 // update clent start 
     updateClient : async(req, res)=>{

        const {
            id,
            company_name,
            cp_name,
            user_name,
            password,
            cp_phone,
            cp_email,
            company_phone,
            company_email,
            company_logo,
            address,
            city,
            state,
            postal_code,
            country,

        } = req.body

        try{
            const clientResult = await ClientUpdate.update({
                id,
                company_name,
                cp_name,
                user_name,
                password,
                cp_phone,
                cp_email,
                company_phone,
                company_email,
                company_logo,
                address,
                city,
                state,
                postal_code,
                country,
            },
            {
                where: { id }
            });
            res.status(201).json({ data: clientResult.recordSet, message: "client updated successfully" });
        } 
         catch (error) {
            console.error("Error to client update:", error);
            res.status(500).json({ message: "Failed to update client" });
        }
    }, 
//ending updateclient 


 //deleteclient  
    deleteClient : async (req, res)=>{
            const {id} =req.body

            try{
                const deleteresult = await Clientdelete.update(
                    {isActive:false},
                    {where:{id}}
                )
                if (deleteresult[0] == 0) {

                    return res.status(404).json({ message: 'Record not found' });
                }
    
                res.status(200).json({ message: 'Record marked as inactive', deleteresult: deleteresult[true] });
            }catch(error){
                res.status(500).json({ message: "Error occurred:" + error.message });

            }
    },  
 //ending client delete staff


 // strating admin user 
    //get admin 
    getAdminId:async (req, res)=>{
        const {id} = req.params
        try{
            const getAdmin = await Admin.findOne({where:{id}});
            res.status(200).json({data:getAdmin})
        }catch(error){
            console.log("error",error);
            res.status(500).json({message :"Failed to retrieve admin details"})
        }
    },

// create admin 
    createadmin: async (req, res) => {

        const {
            user_name,
            password,
            email,
            phone_number,
            admin_role,


        } = req.body;

        try {
            const newadmin = await Admin.create({

                user_name,
                password,
                email,
                phone_number,
                admin_role,

            })
            res.status(201).json({ data: newadmin, message: "admin account created successfully" })
        }
        catch (error) {
            console.error("Error creating newadmin:", error);
            res.status(500).json({ message: "Failed to create AdminUser" });
        }
    },
 //end create admin


//update admin
    updateAdmin:async(req, res)=>{

        const {id}= req.body

            const {
                user_name,
                password,
                email,
                phone_number,
                admin_role,

            }=req.body

            try{
                const adminResult = await adminUpdate.update({
                    user_name,
                    password,
                    email,
                    phone_number,
                    admin_role,
                },
                {
                    where: { id }
                });
                res.status(201).json({ data: adminResult.recordSet, message: "admin updated successfully" });
            } catch(error){
                console.error("Error to admin update:", error);
                res.status(500).json({ message: "Failed to update admin" });
            }
    },
////end admin delete 
    

//start  delete admin api 
    deleteAdmin :async(req, res)=>{
                const {id} =req.body
                
            try{
                const admindeleteresult = await admindelete.update(
                    {isActive:false},
                    {where:{id}}
                )
                if (admindeleteresult[0] == 0) {

                    return res.status(404).json({ message: 'Record not found' });
                }
    
                res.status(200).json({ message: 'Record marked as inactive', admindeleteresult: admindeleteresult[true] });
            }catch(error){
                res.status(500).json({ message: "Error occurred:" + error.message });

            }
    }
 //end delete admin

    

}





