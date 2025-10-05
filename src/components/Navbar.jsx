// import Logo from "../../public/logo.png"

function Navbar(){
  return(
    <div className="absolute top-0 z-[2] w-full  backdrop-blur-sm flex justify-between items-center px-24 py-6 border-b border-slate-700">
      <div>
        <img src="/logo.png" alt="CyberFeed Logo" width={250}/>
      </div>
      <div>
        <button className="font-exo2 font-bold bg-[#A855F7] px-6 py-3 rounded-xl">Login</button>

      </div>
    </div>
  )
}

export default Navbar;