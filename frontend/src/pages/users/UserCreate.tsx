import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wraper from '../../components/Wraper';
import { Role } from '../../models/role';

const UserCreate = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [role_id, setRoleId] = useState(2);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('roles');
        setRoles(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post('users', {
        first_name,
        last_name,
        email,
        role_id,
      });

      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/users');
    }
  }, [redirect]);
  return (
    <Wraper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            id="first-name"
            type="text"
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            type="text"
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-select"
            value={role_id}
            onChange={e => setRoleId(parseInt(e.target.value))}
          >
            {roles.map((role: Role) => {
              return (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary">Save</button>
      </form>
    </Wraper>
  );
};

export default UserCreate;
