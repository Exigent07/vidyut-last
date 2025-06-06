import React from "react";


const Autoshow = ()=>{
    return(

        <div
            className="relative w-screen h-screen transition-all duration-500 ease-in-out overflow-hidden"
            style={{
                backgroundImage: "url('/images/autoshowbg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
                transform: 'scaleX(-1)', 
            }}
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-full bg-black opacity-50 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-10" />

                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-100" />
                <div className="ab  solute inset-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-100" />
            </div>
        </div>
    )
}

export default Autoshow

