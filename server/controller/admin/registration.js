const Admin = require("../../models/User/AdminUser");

const {
    encryptPassword,
    decryptPassword,
    jwt,
    crypto,
    ENCRYPTION_KEY,
    ENCRYPTION_IV,
} = require('../staff/registration');



module.exports={

    // strating admin user 

    adminlogin: async (req, res) => {

        const {user_name,password} = req.body

        try {
            const adminRecord = await Admin.findOne({ where: { user_name } });

            if (!adminRecord) {
                return res.status(404).json({ message: "admin not found" });

            }
            
            const pass = decryptPassword(adminRecord.password);

            if (pass != password) {
                return res.status(401).json({ message: "Access denied: Incorrectttt password" });    
            }

            const token = jwt.sign(
                {
                    id: adminRecord.id,
                    user_name: adminRecord.user_name,
                },
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: "8h" } // Token expreid when this time has finshed 
            );
            res.status(200).json({
                message: "Login successful",
                data: {
                    user_name: adminRecord.user_name,
                    token,
                },
            });

        }
        catch (error) {
            console.error("Error during admin login:", error);
            res.status(500).json({ message: "Server error" });
        }

    },


    getAdminId: async (req, res) => {
        const { id } = req.params;

        try {
            const adminRecord = await Admin.findOne({ where: { id } });

            if (adminRecord) {
                const decryptedPassword = decryptPassword(adminRecord.password);

                res.status(200).json({
                    data: {
                        user_name: adminRecord.user_name,
                        password: decryptedPassword,
                        email: adminRecord.email,
                        phone_number: adminRecord.phone_number,
                        admin_role: adminRecord.admin_role,
                    }
                });
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ message: "Failed to retrieve admin details" });
        }
    },//end admin


    getalladmindata: async(req, res)=>{

        try{
            const alladmin = await Admin.findAll({
                attributes:['id','email','isActive']
            })
            res.status(200).json({data:alladmin,message:"All admin data getting sucessfully "})
        }catch(error){
            console.log("err to fetch client data " + error);
            res.status(500).json({message:"error to get all admin data "})
            
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
            const encryptedPassword = encryptPassword(password);
            const newadmin = await Admin.create({

                user_name,
                password: encryptedPassword,
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
     updateAdmin: async (req, res) => {

        const { id } = req.body
        const {
            user_name,
            password,
            email,
            phone_number,
            admin_role,

        } = req.body

        try {
            const encryptedPassword = encryptPassword(password); //enctypted password
            const adminResult = await Admin.update({
                user_name,
                password: encryptedPassword,
                email,
                phone_number,
                admin_role,
            },
                {
                    where: { id }
                });
            res.status(201).json({ data: adminResult.recordSet, message: "admin updated successfully" });
        } catch (error) {
            console.error("Error to admin update:", error);
            res.status(500).json({ message: "Failed to update admin" });
        }
    },
    ////end admin delete 

    
    //start  delete admin api 
    deleteAdmin: async (req, res) => {
        const { id } = req.body

        try {
            const admindeleteresult = await Admin.update(
                { isActive: false },
                { where: { id } }
            )
            if (admindeleteresult[0] == 0) {

                return res.status(404).json({ message: 'Record not found' });
            }

            res.status(200).json({ message: 'Record marked as inactive', admindeleteresult: admindeleteresult[true] });
        } catch (error) {
            res.status(500).json({ message: "Error occurred:" + error.message });

        }
    }
    //end delete admin
}

