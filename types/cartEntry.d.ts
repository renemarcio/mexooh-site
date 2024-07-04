import { inventarios, bisemanas } from "@prisma/client";

export type CartEntry = {
  item: inventarios;
  value: number;
  fortnights: bisemanas[];
};
