import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { fetchSetLike, fetchRemoveLike } from '../../store/singleArticleSlice';
import { useAppDispatch, useAppSelector } from '../type/hooks';
import type { ArticlePropsType } from '../type/types';

import classes from './ShortArticle.module.scss';

const ShortArticle = (props: ArticlePropsType) => {
  const [checked, setChecked] = React.useState(false);
  const [likeCounter, setLikeCounter] = React.useState(0);
  const [loadingImg, setLoadingImg] = React.useState(true);

  const currentArticle = props.article;
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  function setDate(date: string) {
    if (date) {
      const format = moment(date).format('MMMM D, YYYY');
      return format;
    }
  }

  const handleChange = () => {
    setChecked((checked) => !checked);

    if (!checked) {
      setLikeCounter((cur) => cur + 1);
      dispatch(fetchSetLike(props.article.slug));
    }
    if (checked) {
      setLikeCounter((cur) => cur - 1);
      dispatch(fetchRemoveLike(props.article.slug));
    }
  };

  React.useEffect(() => {
    setChecked(props.article.favorited);
  }, []);

  return (
    <>
      <div className={classes.ShortArticle}>
        <div className={classes.wrapper}>
          <div className={classes.title}>
            <p className={classes.title__text}>
              {' '}
              <Link to={`/articles/${props.article.slug}`}>{props.article.title}</Link>
            </p>
            <label>
              <input
                type="checkbox"
                checked={checked}
                className={classes.like}
                onChange={handleChange}
                disabled={!isLoggedIn}
              />
              <span>{currentArticle.favoritesCount + likeCounter}</span>
            </label>
          </div>
          <ul className={classes.tag__list}>
            {currentArticle.tagList.map((tag: string | number, index: number) => {
              return (
                <li key={index}>
                  <button className={classes.tag}>{tag}</button>
                </li>
              );
            })}
          </ul>

          <p className={classes.description}>{currentArticle.description}</p>
        </div>
        <div className={classes.user}>
          <div className={classes.user__wrapper}>
            <p className={classes.user__name}>{currentArticle.author.username}</p>
            <p className={classes.user__date}>{setDate(currentArticle.updatedAt)}</p>
          </div>

          <img
            className={classes.user__avatar}
            src={
              loadingImg
                ? 'https://powerusers.microsoft.com/t5/image/serverpage/image-id/118082i204C32E01666789C/image-size/large/is-moderation-mode/true?v=v2&px=999'
                : currentArticle.author?.image
            }
            alt="user_avatar"
            onLoad={() => setLoadingImg(false)}
            onError={(e) => (e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/147/147140.png')}
          />
        </div>
      </div>
    </>
  );
};

export default ShortArticle;
