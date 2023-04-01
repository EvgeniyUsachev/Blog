import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { fetchRegistration, removeError } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../type/hooks';

import classes from './SignUp.module.scss';

type FormValues = {
  username: string;
  email: string;
  password: string | number;
  repeat: string | number;
  agreement: boolean;
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector((state) => state.user.error);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setError,
  } = useForm<FormValues>({ mode: 'onBlur' });

  React.useEffect(() => {
    if (error === 'username') {
      setError('username', { type: 'custom', message: 'username is already taken' });
    }
    if (error === 'email') {
      setError('email', { type: 'custom', message: 'email is already taken' });
    }
    if (error === 'none') {
      navigate('/articles');
      dispatch(removeError());
    }
  }, [error]);

  const onSubmit = handleSubmit((data) => {
    const { username, email, password } = data;
    const authData = {
      username,
      email,
      password,
    };

    dispatch(fetchRegistration(authData));
  });

  const password = watch('password');

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.header}>Create new account</h2>
      <form className={classes.form} onSubmit={onSubmit}>
        <label className={classes.label}>
          Username
          <input
            style={errors.username ? { border: '1px solid red' } : { border: '1px solid #d9d9d9' }}
            placeholder="Username"
            {...register('username', {
              required: 'This field is requierd',
              minLength: {
                value: 3,
                message: 'Minimum 3 symbols',
              },
              maxLength: {
                value: 20,
                message: 'Maximum 20 symbols',
              },
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'Only use lowercase English letters and numbers',
              },
            })}
          />
        </label>
        <div className={classes.error}>{errors.username && <p>{errors?.username.message}</p>}</div>

        <label className={classes.label}>
          Email address
          <input
            style={errors.email ? { border: '1px solid red' } : { border: '1px solid #d9d9d9' }}
            placeholder="Email address
          "
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

        <label className={classes.label}>
          Repeat Password
          <input
            type="password"
            style={errors.repeat ? { border: '1px solid red' } : { border: '1px solid #d9d9d9' }}
            placeholder="Password"
            {...register('repeat', {
              required: 'Passwords must match',
              validate: (value) => value === password || 'Passwords must match',
            })}
          ></input>
        </label>
        <div className={classes.error}>{errors.repeat && <p>{errors?.repeat.message}</p>}</div>

        <div className={classes.divider}></div>
        <label className={classes.agreement}>
          <input
            style={errors.agreement ? { outline: '3px solid red' } : { position: 'absolute' }}
            type="checkbox"
            {...register('agreement', { required: 'Please confirm your agreement' })}
          ></input>
          I agree to the processing of my personal information{' '}
          <div className={classes.error}>{errors.agreement && <p>{errors?.agreement.message}</p>}</div>
        </label>

        <button className={classes.submit_btn} disabled={!isValid}>
          Create
        </button>
      </form>
      <div className={classes.sign_in}>
        <span style={{ marginRight: '3px' }}>Already have an account?</span>
        <Link to="/sign-in">Sign in.</Link>
      </div>
    </div>
  );
};

export default SignUp;
