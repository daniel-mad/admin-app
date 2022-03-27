import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wraper from '../components/Wraper';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../models/state';
import { User } from '../models/user';
import { setUser } from '../features/user/userSlice';

const Profile = () => {
  const user = useSelector<State>(state => state.user.info) as User;
  const dispatch = useDispatch();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
  }, [user]);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data } = await axios.put('user/info', {
      first_name,
      last_name,
      email,
    });

    dispatch(setUser(data));
  };

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put('user/password', {
      password,
      password_confirm,
    });
  };
  return (
    <Wraper>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            value={last_name}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-primary">Save</button>
      </form>
      <h3>Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="text"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password Confirm</label>
          <input
            type="text"
            className="form-control"
            value={password_confirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-primary">Save</button>
      </form>
    </Wraper>
  );
};

export default Profile;
