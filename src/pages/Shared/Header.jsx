import React from 'react';
import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom';
const Header = () => {
      return (
            <div className="navbar bg-base-100 border-b shadow-sm py-2  md:px-20">
                  <div className="flex-1">
                        <Link to='/' className="btn btn-ghost normal-case text-xl">EveryThingMart</Link>
                  </div>
                  <div className="flex-none gap-2">
                       
                        <div className="dropdown dropdown-end">
                              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 flex justify-center items-center rounded-full">
                                        <RxAvatar size={40}/>
                                    </div>
                              </label>
                              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                          <a className="justify-between">
                                                Profile
                                               
                                          </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                              </ul>
                        </div>
                  </div>
            </div>
      );
};

export default Header;