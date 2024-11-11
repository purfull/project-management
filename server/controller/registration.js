
const { where } = require("../db");
const Staff = require("../models/User/StaffUser");


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
            
        

    }
     
//  1. // Order to b2 customer b2c


    //   {
    //     "orderType":"",
    //     "orderNumber":"",
    //     "orderDate":"",
    //     "is_market_shipped"	: "",
    //     "OrderItemId":"",
    //     "sku":"",
    //     "Quantity":"",
    //     "Price" : "",
    //     "marketplace_id":"",
    //     "paymentMode":"",
    //     "shippingMethod":""	
    
    // }


//    2. // cancelOrder  indivual api post request

    // {
    //     "reference_code":""
    // }


    // 3.confirm_order
    // {
    //     "order_id":"",
    //     "Authorization":"",
    //     "x-api-key":"",
    //     "invoice_id":""
    // }


    // 4.getOrderDetails    GET request
    // {
    //     "reference_code":"",
    //     "order_id":"",
    //     "invoice_id":""
    // }

    // 5.markReturn
    // {

    //     " invoice_id":"",
     
    //     "items":[
    //      {
    //      "sku":"",
    //      "quantity":""
    //     }
    //     ]
     
    //  }

    // 6.markPendingReturn

    // {

    //     "refernce_code":"",
    //     "parent_sku":"",
    //     "child_sku":"",
    //     "initiated_return_date":"",
    //     "return_reason":"",
    //     "return_quantity":"",
    //     "return_type":"",
    //     "return_awb":"",
    //     "return_carrier_name":""
    
    
    
    // }

    // 7.estimate delivary date  post request

    // {
    //     "pickup_pincode":"",
    //     "drop_pincode":""
    // }
}