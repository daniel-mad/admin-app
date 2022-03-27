import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wraper from '../../components/Wraper';
import { Permission } from '../../models/permission';

const RolesCreate = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('permissions');
      setPermissions(data);
    })();
  }, []);

  const check = (id: number) => {
    if (selected.some(s => s === id)) {
      setSelected(selected.filter(s => s !== id));

      return;
    }
    setSelected([...selected, id]);
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post('roles', {
        name,
        permissions: selected,
      });

      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/roles');
    }
  }, [redirect]);
  return (
    <Wraper>
      <form onSubmit={submit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Permissions</label>
          <div className="col-sm-10">
            {permissions.map((p: Permission) => {
              return (
                <div key={p.id} className="form-check form-check-inline col-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={p.id}
                    onChange={() => check(p.id)}
                  />
                  <label className="from-check-label">{p.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <button className="btn btn-outline-primary">Save</button>
      </form>
    </Wraper>
  );
};

export default RolesCreate;
