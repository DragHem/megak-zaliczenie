export interface product {
  id: string;
  name: string;
  price: number;
  users: user[];
  kittyId: string;
}

export interface user {
  id: string;
  name: string;
  nickname: string;
}

export interface kittyList {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  totalValue: number;
}

export interface kitty {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  description: string;
  totalValue: number;
  isEnded: boolean;
  receiptsPhotos: string;
  users: string[];
  products: product[];
  userValues: number[];
}
