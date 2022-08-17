export interface product {
  _id: string;
  name: string;
  description: string;
  price: number;
  picture: string;
  owner: {
    name: string;
  };
}

export interface category {
  _id: string;
  name: string;
  picture: string;
}

export interface store {
  _id: string;
  name: string;
  description: string;
  address: string;
  location: string;
  picture: string;
  category: [];
  owner: string;
}

export interface order {
  _id: string;
  owner: string;
  seller: string;
  status: string;
  buyDate: Date;
  reservationDate: Date;
  products: [{_id: string; count: number}];
}

export interface user {
  _id: string;
  name: string;
  email: string;
  fuid: string;
}
