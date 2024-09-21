export interface CreateItemDomain {
  name: string;
  price: number;
}

export interface UpdateItemDomain {
  name?: string;
  price?: number;
}