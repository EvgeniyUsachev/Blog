import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { removeError, fetchUser, setsIsLoggedOut } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../type/hooks';
import { fetchArticles } from '../../store/articleSlice';

import classes from './Layout.module.scss';

const Layout: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userLoading = useAppSelector((state) => state.user.userLoading);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const user = useAppSelector((state) => state.user.user);

  const handleLogOut = () => {
    dispatch(setsIsLoggedOut());
    localStorage.clear();
    dispatch(removeError());
    message.success('You have been logged out');
    dispatch(fetchArticles(0)).then(() => navigate('/articles'));
  };

  if (!userLoading) {
    if (!isLoggedIn) {
      return (
        <>
          <header className={classes.header}>
            <Link to="/articles">
              <button className={classes.blog_link}>Blog</button>
            </Link>

            <div className={classes.wrapper}>
              <Link to="/sign-in">
                <button className={classes.sign_in}>Sign in</button>
              </Link>
              <Link to="/sign-up">
                <button className={classes.sign_up}>Sign up</button>
              </Link>
            </div>
          </header>
          <main className={classes.main}>
            <Outlet />
          </main>
        </>
      );
    }
    return (
      <>
        <header className={classes.header}>
          <Link to="/articles">
            <button className={classes.blog_link}>Blog</button>
          </Link>

          <div className={classes.wrapper}>
            <Link to="/new-article">
              <button className={classes.create_article}>Create article</button>
            </Link>
            <div className={classes.username}>
              <Link to="/profile">{user?.username}</Link>
            </div>
            <div className={classes.userimage}>
              <Link to="/profile">
                <img
                  src={user?.image || '42'}
                  onError={(e) => (e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/147/147140.png')}
                ></img>
              </Link>
            </div>

            <Link to="/articles">
              <button className={classes.log_out} onClick={handleLogOut}>
                Log out
              </button>
            </Link>
          </div>
        </header>
        <main className={classes.main}>
          <Outlet />
        </main>
      </>
    );
  } else return <div></div>;
};
export default Layout;
