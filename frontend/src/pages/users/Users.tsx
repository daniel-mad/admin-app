import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wraper from '../../components/Wraper';
import { User } from '../../models/user';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`users?page=${page}`);
      setUsers(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const del = async (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this record?')) {
        await axios.delete(`users/${id}`);
        setUsers(users.filter((u: User) => u.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wraper>
      <div className="btn-group my-2 border-bottom py-3">
        <Link to={'/users/create'} className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role?.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/users/${user.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <a
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(user.id)}
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
      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wraper>
  );
};

export default Users;
