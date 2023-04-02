export interface AuthDataRegistrationType {
  username: string;
  email: string;
  password: string | number;
}
export interface UserType {
  email: string;
  password: string;
  username: string;
  image?: string;
}

export interface ArticlePropsType {
  article: {
    author: {
      username: string;
      image: string;
      following: boolean;
    };
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
  };
}

export interface ArticleType {
  author: {
    username: string;
    image: string;
    following: boolean;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface UpdatePostDataType {
  updateData: {
    title: string;
    description: string;
    body: string | number;
    tagList: string[];
  };
  slug: string | undefined;
}

export interface CreatePostDataType {
  title: string;
  description: string;
  body: string | number;
  tagList: string[];
}

export type LoginDataType = {
  email: string;
  password: string | number;
};

export interface UpdateProfileDataType {
  [k: string]: string | number | null;
}
