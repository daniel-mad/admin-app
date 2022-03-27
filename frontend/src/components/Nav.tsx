import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { User } from '../models/user';
import { useSelector } from 'react-redux';
import { State } from '../models/state';

const Nav = () => {
  const user = useSelector<State>(state => state.user.info) as User;

  const logout = async () => {
    await axios.post('logout');
  };
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
        Company name
      </a>
      <ul className="navbar-nav flex-row">
        <li className="nav-item">
          <NavLink to={'/profile'} className="nav-link p-3">
            {user?.first_name} {user?.last_name}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/login'} className="nav-link p-3" onClick={logout}>
            Sign out
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
