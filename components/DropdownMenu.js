import React, { useState } from "react";

import { IoIosHelpCircleOutline } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';
import {CiSettings} from 'react-icons/ci'

import {CgProfile} from 'react-icons/cg'
import Link from "next/link";
import {useSession} from "next-auth/react";

export default function DropdownMenu() {

const {data:session} = useSession();

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const HoverStyle = 'flex gap-3 p-3 hover:bg-gray-200 hover:text-indigo-600 rounded-lg';

  return (
    <div className={`navigation${isActive ? " active" : ""}`}>
      <div className="userBx">
        <p className="username">{session?.user?.name}</p>
      </div>
      <div className="menuToggle" onClick={handleClick}>
        <img src={session?.user?.image}  alt="user" />
      </div>
      <div className="menu">
        <ul>
        <li className={HoverStyle}>
          <Link href="/"><CgProfile size={22}/>My profile</Link>
        </li>

        <li  className={HoverStyle}>
          <Link href="/"><CiSettings size={22}/> Settings</Link>
        </li>
        <li  className={HoverStyle}>
          <Link href="/"><IoIosHelpCircleOutline size={22}/> Help & support</Link>
        </li>
        <li  className={HoverStyle}>
          <Link href="/"><CiLogout size={22}/> Logout</Link>
        </li>
        </ul>
      </div>
      
    </div>
  );
}
