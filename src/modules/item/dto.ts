import { Item } from "@prisma/client";

export interface CreateItemRequestDTO {
  name: string;
  price: number;
}

export interface CreateItemResponseDTO {
  item: Item;
}

export interface FindAllItemsResponseDTO {
  items: Item[];
}

export interface UpdateItemRequestDTO {
  id: number;
  name?: string;
  price?: number;
}

export interface UpdateItemResponseDTO {
  item: Item;
}