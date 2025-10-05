import { Link } from "react-router-dom";

function HomePage(){
 
return(
  <div className="flex items-center h-dvh font-orbitron px-24 gap-6" >

    
      <div className="basis-1/2">
        <h1 className="text-7xl font-bold">Share Your World</h1>

        <h2 className="text-xl mt-8 mb-12">
          Cyberfeed is your space to share what's on your mind. Post a quick thought, 
          upload your favorite photos, and see what your friends are up to. It's that simple.
        </h2>

        <Link to="/dashboard">
          <button className="font-bold px-12 py-6 rounded-xl border cursor-pointer">D I S C O V E R</button>
        </Link>
      </div>

      <div className="basis-1/2">
        <img src="/logo.png" alt="Logo CyberFeed" />
      </div>
    
 
  </div>
)
}

export default HomePage;