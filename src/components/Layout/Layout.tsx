import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Pagination, message, Popconfirm } from 'antd';

import { setError, fetchUser, setsIsLoggedOut } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../type/hooks';
import { fetchArticles, setCurrentPage } from '../../store/articleSlice';
import Footer from '../Footer/Footer';

import classes from './Layout.module.scss';

const Layout: React.FC = () => {
  const total: number = useAppSelector((state) => state.article.total);
  const loading: boolean = useAppSelector((state) => state.article.loading);
  const currentPage: number = useAppSelector((state) => state.article.currentPage);

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userLoading = useAppSelector((state) => state.user.userLoading);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const user: any = useAppSelector((state) => state.user.user);

  const handleLogOut = () => {
    dispatch(setsIsLoggedOut());
    localStorage.clear();
    dispatch(setError());
    message.success('You have been logged out');
  };

  // const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
  //   console.log(e);
  //   message.success('Click on Yes');
  // };

  // const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
  //   console.log(e);
  //   message.error('Click on No');
  // };

  console.log('image', user.image);

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
          {/* <Footer /> */}
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
            <Link to="/sign-up">
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
              {/* <Popconfirm
                title="Delete the task"
                description="Are you sure you want to log out?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                okType="primary"
              > */}
              {/* <button className={`${classes.log_out} ${classes.log_out_hidden}`}>clcik</button> */}
              <button className={classes.log_out} onClick={handleLogOut}>
                Log out
              </button>
              {/* </Popconfirm> */}
            </Link>
          </div>
        </header>
        <main className={classes.main}>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </>
    );
  } else return <div></div>;
};
export default Layout;
