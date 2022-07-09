import Link from "next/link"
import Image from "next/image"

function Header() {
  return (
    <header className="flex justify-between min-w-full bg-transparent p-5">
                <div className="flex items-center space-x-5">
                    <Link href={"/"}>
                        <div className="flex max-w-5 justify-between items-center">
                            <img className="w-25 h-10 object-contain cursor-pointer" src="./images/logo.svg" alt="" />
                            <span> 
                                <h3 className="text-3xl font-extrabold font-mono text-sky-500 hover:cursor-pointer">
                                    Blogster
                                </h3> 
                            </span>
                        </div>
                    </Link>
                    <div className="hidden text-white md:inline-flex items-center space-x-5 ">
                        <h3>About</h3>
                        <h3>Contact</h3>
                        <h3 className=" text-white bg-indigo-600 px-4 py-1 rounded-full">Follow</h3> 
                    </div>
                </div>

                <div className="flex items-center space-x-5 text-lg font-bold text-rose-400">
                    <h3 className=" m6-5" >Sign In</h3>
                    <h3 className=" border px-4 py-1 rounded-full border-rose-400" >Get Started</h3>
                </div> 
        </header>

        // <div class="relative z-10 mx-auto w-full sm:max-w-screen-sm">
        //     <div class="relative">
        //         <span class="pointer-events-none absolute top-[-60vw] left-0 right-0 bottom-[-6vw] z-[-1] bg-gradient-to-r from-rose-400/20 via-fuchsia-500/20 to-indigo-500/20 blur-3xl filter sm:top-[-6vw] sm:right-[-7vw] sm:left-[-7vw]">
        //         </span>
        //     </div>
        // </div>
    
  );
}

export default Header