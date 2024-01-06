import React, { FormEvent, useEffect, useState } from 'react';
import { useSession } from '../../hooks';
import './Login.css';

function initialFormValues() {
  return {
    login: '',
    password: ''
  }
}

function Login() {
  const [values, setValues] = useState(initialFormValues);
  const [loginRequestStatus, setLoginRequestStatus] = useState('success');
  const { signIn } = useSession();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoginRequestStatus('loading');
    try {
      await signIn(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoginRequestStatus('success');
    }
  }

  useEffect(() => {
    // clean the function to prevent memory leak
    return () => setLoginRequestStatus('success');
  }, []);

  return (
    <div className="login-page">
      <form noValidate onSubmit={handleSubmit}>
        <div className="form">
          <input
            value={values.login}
            type="login"
            name="login"
            id="login"
            disabled={loginRequestStatus === 'loading'}
            placeholder="login"
            onChange={handleChange}
          />
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            disabled={loginRequestStatus === 'loading'}
            placeholder="password"
            onChange={handleChange}
          />
          <button type="submit" disabled={loginRequestStatus === 'loading'}>
            {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login;
