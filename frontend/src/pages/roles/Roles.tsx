import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Wraper from '../../components/Wraper';
import { Role } from '../../models/role';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('roles');
      setRoles(data);
    })();
  }, []);

  const del = async (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this record?')) {
        await axios.delete(`roles/${id}`);
        setRoles(roles.filter((r: Role) => r.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wraper>
      <div className="btn-group my-2 border-bottom py-3">
        <Link to={'/roles/create'} className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/roles/${role.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <a
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(role.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wraper>
  );
};

export default Roles;
