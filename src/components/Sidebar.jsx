import { useState } from "react";
import { NavLink } from "react-router-dom";
import {RiCloseLine} from 'react-icons/ri'
import {HiOutlineMenu} from 'react-icons/hi'

import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({handleClick}) => (
  <div className="mt-10">
    {links.map((item) => (
      //We want to loop over the links, which we are importing from the assets, so we can say links.map, we get each individual item (or a link) and we return a simple NavLink, and we want to return item.name
      <NavLink 
      key={item.name}
      to={item.to}
      className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
      onClick={() => handleClick && handleClick()}
      //We make a callback function handle click, but we can call that handleClick only on mobile devices
      //So what we have to do first is check if handleClick exists, by typing if handleClick exsist only then call handleClick(), and that's gonna be coming through props
      >
        <item.icon className="w-6 h-6 mr-2"/>
        {item.name}
      </NavLink>
    ))}
  </div>
)
//Since we'll be using the navigation bar both on mobile and on desktop devices to make everything reusable, we create NavLinks (arrow function component)

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  //Inside of our sidebar we need to know if our mobile navbar is currently open, in case we're on our mobile

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt='logo' className="w-full h-14 object-contain"/>
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)}/>
        ): <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/>}
        {/* If our mobile menu is open in that case we want to return  <RiCloseLine />, otherwise we show <HiOulineMenu /> */}
      </div>
      {/* We focus on our mobile sidebar with this div */}

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
      {/* We use dynamic blocks to check if the menu is open  */}
        <img src={logo} alt='logo' className="w-full h-14 object-contain"/>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
        {/* We have to provide handleClick to NavLinks in order for menu to work */}
      </div>
    </>
  )
};

export default Sidebar;
