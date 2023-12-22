

const About = () => {
    return (
        <div>
          <div className=" lg:px-40 lg:py-20">
           
           <div className="card card-side mt-20 bg-white text-cyan-900  shadow-xl mb-8 h-[46vh] lg:h-[80vh] mx-16">
               <figure className="w-2/3">
                   <img src={"https://i.ibb.co/3WP2xvR/heavy-box.png"}  />
               </figure>
               <div className="card-body">
                   <h2 className="card-title mt-10 lg:mt-48 lg:text-4xl lg:font-bold text-blue-800">Heavy Furniture Moving!</h2>
                   <p className="text-sm lg:text-lg">Our team of professional movers <br />are ready to  help to move your heavy furnitures.</p>
                   
               </div>
           </div>
           <div className="card card-side bg-white text-cyan-900  shadow-xl mb-8 h-[46vh] lg:h-[80vh] mx-16">
              
               <div className="card-body lg:mx-10 ">
                   <h2 className="card-title mt-10 lg:mt-48 lg:text-4xl lg:font-bold text-blue-800">Any type of shifting!</h2>
                   <p className="text-sm lg:text-lg">Home shifting, Office shifting, Single furniture <br />shifting,Plants shifting etc. We can help you with any type of shifting.</p> 
               </div>
               <figure className="w-2/3">
                   <img src={"https://i.ibb.co/0MTsq6b/packing.png"}  />
                   </figure>
           </div>
           <div className="card card-side bg-white text-cyan-900 shadow-xl h-[46vh] lg:h-[80vh] mx-16 mb-16">
               <figure className="w-2/3">
                   <img src={"https://i.ibb.co/GVR7vNX/moving.png"}  />
               </figure>
               <div className="card-body lg:mr-8">
                   <h2 className="card-title mt-10 lg:mt-48 lg:text-4xl lg:font-bold  text-blue-800">Also helping with packing!</h2>
                   <p className="text-sm lg:text-lg ">We can also help you with packing.  Our <br /> special employees will help you to pack everything.</p>
                   
               </div>
           </div>
        
       </div>  
        </div>
    );
};

export default About;