import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import isImageURL from 'image-url-validator';

import classes from './ShortArticle.module.scss';

const ShortArticle = (props: any) => {
  const currentArticle = props.article;

  function setDate(date: string) {
    if (date) {
      const format = moment(date).format('MMMM D, YYYY');
      return format;
    }
  }
  // console.log('props', props.article);
  function getImage(url: string) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.onload = function () {
        resolve(url);
      };
      img.onerror = function () {
        reject(url);
      };
      img.src = url;
    });
  }

  function isImgUrl(url: string) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

  // async function CheckImg() {
  //   await isImageURL('https://via.placeholder.com/300/09f/fff.png');
  // }

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
              <input type="checkbox" className={classes.like} />
              <span>{currentArticle.favoritesCount}</span>
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
            src={currentArticle.author?.image}
            alt="user_avatar"
            // onLoad={() => console.log('load')}
            onError={(e) => (e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/147/147140.png')}
          />
        </div>
      </div>
    </>
  );
};

export default ShortArticle;
