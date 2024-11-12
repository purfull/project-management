
const { where } = require("../db");
const Staff = require("../models/User/StaffUser");
const Client = require("../models/User/ClientUser");
const Admin = require("../models/User/AdminUser")
// updates
const StaffUpdate = require("../models/User/StaffUser");
// deletes
const deleteStaff = require("../models/User/StaffUser")



module.exports ={
    
    getAllOrders: async (req, res) => {
        try {
            const Orders = await Orders.findAll();
            res.status(200).json({ data: Orders });
        } catch (error) {
            console.log("error", error);
            res.status(500).json({ message: "Failed to retrieve Orders" });
        }
    },
    
    getOrdersById: async (req, res) => {
        const {id } = req.params
          try {
              const Orders = await Orders.findOne({where: {id}});
              res.status(200).json({ data: Orders });
          } catch (error) {
              console.log("error", error);
              res.status(500).json({ message: "Failed to retrieve Product detial" });
          }
      },

// starting  staffuserr

    createStaff: async (req, res) => {

        const{
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

            try{
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
            catch(error){
                console.error("Error creating newstaff:", error);
                res.status(500).json({ message: "Failed to create staff" });
            }
            
        

    },

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
            where: {id}
          });
    
          console.log("ttttt ", updateStaff[0]);
          
          res.status(201).json({ data: updateStaff.recordSet, message: "staff updated successfully" });
        } catch (error) {
          console.error("Error to staff update:", error);
          res.status(500).json({ message: "Failed to update staff" });
        }
    },
      


        // update ending for staff user



        // delete staff starting 

            deleteStaff : async (req, res)=>{

                        const {id}= req.body

                        try{

                            const result = await deleteStaff.update(

                                { isActive: false }, 
                                { where: { id }} 
                            )

                            if (result[0] == 0) { 

                                return res.status(404).json({ message: 'Record not found' });
                              }
                          
                              res.status(200).json({ message: 'Record marked as inactive', result: result[true] });                       
                             }



                             catch(error){
                                res.status(500).json({ message: 'Error occurred: ' + err.message });

                             }

            },

            //staff delete api ending 








        // delete staff ending 


 // staring cleint user

    createclient: async (req, res) => {

        const{
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
        console.log(req.body);
        
    
            try{
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
            catch(error){
                console.error("Error creating newclient:", error);
                res.status(500).json({ message: "Failed to create clientuser" });
            }
            
        
    
    },


 // strating admin user 
    
   createadmin: async (req, res) => {

    const{
        user_name,
        password,
        email,
        phone_number,
        admin_role,
        
        
    } = req.body;

        try{
            const newadmin = await Admin.create({
                
          user_name,
          password,
          email,
          phone_number,
          admin_role,
                
            })
            res.status(201).json({ data: newadmin, message: "admin account created successfully" })
        }
        catch(error){
            console.error("Error creating newadmin:", error);
            res.status(500).json({ message: "Failed to create AdminUser" });
        }
        
    

    }




     

}





 