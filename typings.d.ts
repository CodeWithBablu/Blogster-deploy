export interface post {
  _id: string;
  _createdAt: string;
  author: {
    name: string;
    image: string;
  };
  body: [object];
  mainImage: {
    asset: {
      url: string;
    };
  };
  comments:[comment];
  description: string;
  publishedAt: string;
  slug: {
    current: string;
  };
  title: string;
  _updatedAt: string;
}

export interface comment{
  approved: boolean;
  comment: string;
  name: string;
  _id: string;
  email: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
