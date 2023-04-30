import { Item } from "./item";

export interface User {
    id: number;
    name: string;
    password: string;
    lists: {"Default": Item[]};
    library: {"Default": Item[]};
    following: User[];
    followers: User[];
  }