import axios from 'axios';
import React, { Component, ComponentProps, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import Nav from './Nav';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
interface Prop {
  children: any;
}

const Wraper = (props: Prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    (async () => {
      try {
        const { data } = await axios.get('user', {
          cancelToken: source.token,
        });

        dispatch(setUser(data));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('successfully aborted');
        }
        setRedirect(true);
      }
    })();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (redirect) {
      navigate('/login');
    }
  }, [redirect]);

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Wraper;
