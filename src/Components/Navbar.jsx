import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {

    const {user} = useContext(AuthContext);
    // console.log(user);
    const {SingOutUser } = useContext(AuthContext);

    const handleLogOut= ()=>{
      console.log('log Out');
      SingOutUser()
      .then(()=>{
        console.log('Sing OUt User')

            Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "LogOut Successful",
                      showConfirmButton: false,
                      timer: 2000
                    });

      })
      .catch(err=>{
        console.log(err)
      })

    };



    const links = <>
   <NavLink to={'/'}>   <li className="text-2xl font-semibold hover:bg-red-400 hover:text-white"><a>Home</a></li></NavLink>
    <NavLink to={'/allUser'}>   <li  className="text-2xl font-semibold hover:bg-red-400 hover:text-white"><a>AllUsers</a></li></NavLink>
   
    <NavLink to={'/about'}>   <li  className="text-2xl font-semibold hover:bg-red-400 hover:text-white"><a>About</a></li></NavLink>
    </>;

    return (
        <div>
            <div className="navbar bg-green-400 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       
       {
        links
       }
      </ul>
    </div>
    <button className="btn btn-ghost flex justify-center items-center text-xl">E<samp className="-ml-1 text-orange-500 text-xl">Buzzer</samp></button>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

    {
        links
    }
    </ul>
  </div>

  {/* <div className="navbar-end">
    <Link to={'/login'}> <button className="btn bg-orange-500 text-2xl border-none">Login</button></Link>
  </div>  */}

  {/* bag Icon */}

  {!user?
  
  <div className="navbar-end">
    <Link to={'/login'}> <button className="btn bg-orange-500 text-2xl border-none">Login</button></Link>
  </div> :

<div className="navbar-end">
<div  className="dropdown dropdown-end">
<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
  <div className="w-10 rounded-full">
    <img
      alt="Tailwind CSS Navbar component"
      src={user?.photoURL}  />
  </div>
</div>
<ul
  tabIndex={0}
  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
  <li>
    <a className="justify-between">
     {user?.displayName}
     
    </a>
  </li>
  <li><a>Settings</a></li>
  <li><button onClick={handleLogOut}>Logout</button></li>
</ul>
</div> 

</div>

  }


 
 
</div>

        </div>
    );
};

export default Navbar;