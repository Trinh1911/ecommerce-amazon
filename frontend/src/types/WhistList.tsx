export type WhistListItem = {
  image: string | undefined;
  slug: string;
  quantity: number;
  countInStock: number;
  price: number;
  _id: string;
  name: string;
};

export type WhistList = {
  WhistListItems: WhistListItem[];
};
