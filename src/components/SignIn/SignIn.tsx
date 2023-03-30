import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, redirect, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { fetchLogin, setsIsLoggedIn } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../type/hooks';

import classes from './SignIn.module.scss';

type FormValues = {
  email: string;
  password: string | number;
};

const SignIn = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = handleSubmit((data) => {
    // const { email, password } = data;
    // const authData = {
    //   email,
    //   password,
    // };
    // dispatch(fetchRegistration(authData));
    dispatch(fetchLogin(data));
    console.log(data);
    dispatch(setsIsLoggedIn());
    // console.log(authData);
    message.success('Welcome back!');
    navigate('/articles');
  });

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.header}>Sign In</h2>
      <form className={classes.form} onSubmit={onSubmit}>
        <label className={classes.label}>
          Email address
          <input
            placeholder="Email address
          "
            style={errors.email ? { border: '1px solid red' } : { border: '1px solid #d9d9d9' }}
            {...register('email', {
              required: 'This field is requierd',

              pattern: {
                value:
                  /^[a-z0-9-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/g,
                message: 'Email is not valid',
              },
            })}
          ></input>
        </label>
        <div className={classes.error}>{errors.email && <p>{errors?.email.message}</p>}</div>

        <label className={classes.label}>
          Password
          <input
            style={errors.password ? { border: '1px solid red' } : { border: '1px solid #d9d9d9' }}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'This field is requierd',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be max 40 characters.',
              },
            })}
          ></input>
        </label>
        <div className={classes.error}>{errors.password && <p>{errors?.password.message}</p>}</div>

        <button className={classes.submit_btn}>Login</button>
      </form>
      <div className={classes.sign_in}>
        <span style={{ marginRight: '3px' }}>Don`t have an account?</span>
        <Link to="/sign-up">Sign up.</Link>
      </div>
    </div>
  );
};

export default SignIn;
