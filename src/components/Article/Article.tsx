import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { message, Popconfirm } from 'antd';

import { fetchDeletePost, fetchSetLike, fetchRemoveLike } from '../../store/singleArticleSlice';
import { useAppDispatch, useAppSelector } from '../type/hooks';

import classes from './Article.module.scss';
import './Ant.css';

const Article = () => {
  const dispatch = useAppDispatch();

  function setDate(date: string) {
    if (date) {
      const format = moment(date).format('MMMM D, YYYY');
      return format;
    }
  }
  const navigate = useNavigate();

  const confirm = () => {
    dispatch(fetchDeletePost(currentArticle.slug)).then(() => navigate('/articles'));
    message.success('Article removed!');
  };

  const [checked, setChecked] = React.useState(false);
  const [likeCounter, setLikeCounter] = React.useState(0);
  const [loadingImg, setLoadingImg] = React.useState(true);

  const currentArticle = useAppSelector((state) => state.article.currentArticle);
  const username = useAppSelector((state) => state.user.user.username);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  console.log('from article', currentArticle);

  const deleteBtn =
    currentArticle?.author?.username === username && isLoggedIn ? (
      <>
        <Popconfirm
          className={classes.ant_popover}
          placement="bottom"
          title="Delete the article"
          description="Are you sure to delete this article?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <button className={classes.delete}>Delete</button>
        </Popconfirm>
        <Link to="edit">
          <button className={classes.edit}>Edit</button>
        </Link>
      </>
    ) : null;

  const handleLikeChange = () => {
    setChecked((checked) => !checked);

    if (!checked) {
      setLikeCounter((cur) => cur + 1);
      dispatch(fetchSetLike(currentArticle.slug));
    }
    if (checked) {
      setLikeCounter((cur) => cur - 1);
      dispatch(fetchRemoveLike(currentArticle.slug));
    }
  };

  React.useEffect(() => {
    setChecked(currentArticle.favorited);
  }, []);

  return (
    <>
      <div className={classes.Article}>
        <div className={classes.wrapper}>
          <div className={classes.title}>
            <p className={classes.title__text}>{currentArticle?.title} </p>
            <label>
              <input
                type="checkbox"
                className={classes.like}
                checked={checked}
                onChange={handleLikeChange}
                disabled={!isLoggedIn}
              />
              <span>{currentArticle?.favoritesCount ? currentArticle?.favoritesCount + likeCounter : likeCounter}</span>
            </label>
          </div>
          <ul className={classes.tag__list}>
            {currentArticle?.tagList?.map((tag: string | number, index: number) => {
              return (
                <li key={index}>
                  <button className={classes.tag}>{tag}</button>
                </li>
              );
            })}
          </ul>

          <p className={classes.description}>{currentArticle?.description}</p>
          <div>
            <ReactMarkdown>{currentArticle.body}</ReactMarkdown>
          </div>
        </div>
        <div className={classes.userinfo}>
          <div className={classes.user}>
            <div className={classes.user__wrapper}>
              <p className={classes.user__name}>{currentArticle?.author?.username}</p>
              <p className={classes.user__date}>{setDate(currentArticle?.updatedAt)}</p>
            </div>

            {/* {imgLoaded} */}

            <img
              className={classes.user__avatar}
              src={
                loadingImg
                  ? 'https://powerusers.microsoft.com/t5/image/serverpage/image-id/118082i204C32E01666789C/image-size/large/is-moderation-mode/true?v=v2&px=999'
                  : currentArticle?.author?.image
              }
              alt="user_avatar"
              onLoad={() => setLoadingImg(false)}
              onError={(e) => (e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/147/147140.png')}
            />
          </div>
          <div className={classes.user__buttons}>{deleteBtn}</div>
        </div>
      </div>
    </>
  );
};

export default Article;
