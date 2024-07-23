const Login = () => {
    return ( 
        <div className="bg-[#f5f5f5] h-[100vh]  ">
        
             <section id="main" class=" h-[100vh] sm:w-full  sm:flex sm:items-center sm:justify-center">

        <div id="inside"  class=" h-[130vh] sm:h-[100vh] w-[100%] flex items-center flex-col sm:flex-row justify-around  rounded-2xl bg-[#f5f5f9]">

            <!-- img div -->
            <div id="side-img" class="h-[60%] w-[94%]  sm:h-[94%] sm:w-[35%] mt-2 sm:mt-0 rounded-xl ">
               
            </div>


            <!-- hello agin  div -->
            <div
                class=" h-[60%] w-[94%]  sm:h-[94%] sm:w-[50%] flex flex-col items-center justify-evenly bg-[#f5f5f9] rounded-2xl ">


                <!-- hlo again text -->
                <div class="sm:h-[18%] sm:w-[80%] ">
                    <h2 class=" text-[30px] sm:text-[36px] font-[700] text-center">Hello Again!</h2>
                    <p class="text-[18px] p-[10px]   sm:ml-[21%]">Welcome back you'we been missed</p>
                </div>

                <!-- input tags -->
                <div id="input" class="flex flex-col items-center justify-evenly  w-[90%]    sm:w-[80%] ">
                     <input type="text" placeholder="Enter username " class="   w-full sm:w-[80%] p-4 my-3">
                    <input type="password" placeholder="Password" class="w-full  sm:w-[80%] p-4 my-3">
                </div>
                <!-- `sign in button -->
                <button id="btn-primary" class="h-[8%] w-[60%] sm:w-[60%] text-[white] text-[15px] font-[600] sm:relative sm:bottom-[1%] ">Sign in</button>

                <!-- continue with -->
                <p class="text-[15px] sm:text-auto">or continue with</p>

                <!-- logos -->
                <div id="logos" class="flex items-center justify-evenly   w-[40%] sm:h-[10%] sm:w-[30%]">
                    <img src="./icons/icons8-google.svg" alt="">
                    <img src="./icons/icons8-apple (1).svg" alt="">
                    <img src="./icons/icons8-facebook.svg" alt="">
                </div>
            </div>

        </div>

    </section>
                    
        </div>
     );
}
 
export default Login;
