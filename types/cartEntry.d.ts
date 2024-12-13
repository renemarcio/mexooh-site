import { inventarios, bisemanas } from "@prisma/client";
import { Fortnight, Inventory } from "./websiteTypes";

export type CartEntry = {
  item: Inventory;
  value: number;
  fortnights?: Fortnight[];
};
