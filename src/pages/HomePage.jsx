import { Link } from "react-router-dom";

function HomePage(){
 
return(
  <div className="xl:flex xl:items-center h-auto xl:h-dvh font-orbitron px-6 mt-8 md:px-24 xl:gap-6" >

    
      <div className="basis-1/2">
        <h1 className="text-5xl md:text-7xl font-bold">Share Your World</h1>

        <h2 className="text-lg text-justify xl:text-left md:text-xl mt-8 mb-12">
          Cyberfeed is your space to share what's on your mind. Post a quick thought, 
          upload your favorite photos, and see what your friends are up to. It's that simple.
        </h2>

        <Link to="/dashboard">
          <button className="font-bold px-8 md:px-12 py-4 md:py-6 rounded-xl border cursor-pointer hover:bg-white/10 transition-colors">D I S C O V E R</button>
        </Link>
      </div>

      <div className="basis-1/2 mt-12 xl:mt-0">
        <img src="/logo.png" alt="Logo CyberFeed" />
      </div>
    
 
  </div>
)
}

export default HomePage;