import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, redirect, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { fetchUpdateProfile, setsIsLoggedIn } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../type/hooks';

import classes from './Profile.module.scss';

type FormValues = {
  username: string;
  email: string;
  password: string | number;
  image: string;
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user: any = useAppSelector((state) => state.user.user);
  console.log('user', user);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setError,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
      image: '',
    },
  });

  console.log('valid profile form=', isValid);

  const onSubmit = handleSubmit((data) => {
    const changedData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''));
    dispatch(fetchUpdateProfile(changedData));
    message.success('All changes saved');
    navigate('/articles');
  });

  const url =
    watch('image') ||
    'https://avatars.mds.yandex.net/i?id=9f9e6b333ada12f3f2cac1a6dd8f41548a9fe3b0-9067891-images-thumbs&n=13';

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.header}>Edit Profile</h2>
      <form className={classes.form} onSubmit={onSubmit}>
        <label className={classes.label}>
          Username
          <input
            style={errors.username ? { border: '1px solid red' } : { border: '1px solid #d9d9d9' }}
            placeholder="username"
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
          New password
          <input
            style={errors.password ? { border: '1px solid red' } : { border: '1px solid #d9d9d9' }}
            type="password"
            placeholder="Password"
            {...register('password', {
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
          Avatar image (url)
          <input
            style={errors.image ? { border: '1px solid red' } : { border: '1px solid #d9d9d9' }}
            type="text"
            placeholder="Avatar image"
            {...register('image', {
              //   validate: validURL,
              //   minLength: {
              //     value: 6,
              //     message: 'Your password needs to be at least 6 characters.',
              //   },
              //   maxLength: {
              //     value: 40,
              //     message: 'Your password needs to be max 40 characters.',
              //   },
            })}
          ></input>
          <img
            className={classes.checkImg}
            src={url}
            onError={() => setError('image', { type: 'custom', message: 'Invalid image url' })}
          ></img>
        </label>
        <div className={classes.error}>{errors.image && <p>{errors?.image.message}</p>}</div>

        <button className={classes.submit_btn} disabled={!isValid}>
          Save
        </button>
      </form>
      <div className={classes.sign_in}>
        <span style={{ marginRight: '3px' }}>Don`t have an account?</span>
        <Link to="/sign-up">Sign up.</Link>
      </div>
    </div>
  );
};

export default Profile;