import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('login', {
        email,
        password,
      });

      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/');
    }
  }, [redirect]);
  return (
    <main className="form-signin Login">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
        <input
          type="email"
          className="form-control mt-2"
          placeholder="name@example.com"
          required
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control  mt-2"
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
        <p className="mt-5 mb-3 text-muted">Daniel &copy; 2022</p>
      </form>
    </main>
  );
};

export default Login;
