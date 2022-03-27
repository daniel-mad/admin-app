import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('register', {
        first_name,
        last_name,
        email,
        password,
        password_confirm,
      });
      setRedirect(true);
    } catch (error) {
      console.log('Error:', error);
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
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          required
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="form-control  mt-2"
          placeholder="Last Name"
          required
          onChange={e => setLastName(e.target.value)}
        />

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
        <input
          type="password"
          className="form-control"
          placeholder="Password Confirm"
          required
          onChange={e => setPasswordConfirm(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
        <p className="mt-5 mb-3 text-muted">Daniel &copy; 2022</p>
      </form>
    </main>
  );
};

export default Register;
