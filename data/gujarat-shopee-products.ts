import { assetPath } from "@/lib/assets";
import type { ContainerColor, ContainerShape, Product } from "@/data/products";

type GujaratShopeeRow = {
  sourceId: number;
  name: string;
  slug: string;
  image: string;
  unit: string;
  sourceCategory: string;
  sourceParentCategory: string;
  sourceCategorySlug: string;
  sourceUrl: string;
};

const variantImageBase = "/images/generated/gujarat-shopee-variants-original";
const pending = "Specification pending";

const sourceRows = [
  {
    "sourceId": 5947,
    "name": "10 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "10-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "10-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/10-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4245,
    "name": "10 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "10-inch-brown-paper-pizza-box-3-ply",
    "image": "10-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/10-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4271,
    "name": "10 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "10-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "10-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/10-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5960,
    "name": "10 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "10-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "10-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/10-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4258,
    "name": "10 Inch White Paper Pizza Box 3 Ply",
    "slug": "10-inch-white-paper-pizza-box-3-ply",
    "image": "10-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/10-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4282,
    "name": "10 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "10-inch-white-paper-premium-pizza-box-3-ply",
    "image": "10-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/10-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5026,
    "name": "10 x 9 x 1.75 Inch Brown Paper Triangle Pizza Box 3 Ply",
    "slug": "10-x-9-x-175-inch-brown-paper-triangle-pizza-box-3-ply",
    "image": "10-x-9-x-175-inch-brown-paper-triangle-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Triangle Shape Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "triangle-shape-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/10-x-9-x-175-inch-brown-paper-triangle-pizza-box-3-ply"
  },
  {
    "sourceId": 5126,
    "name": "10 x 9 x 1.75 Inch Top White Paper Triangle Pizza Box 3 Ply",
    "slug": "10-x-9-x-175-inch-top-white-paper-triangle-pizza-box-3-ply",
    "image": "10-x-9-x-175-inch-top-white-paper-triangle-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Triangle Shape Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "triangle-shape-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/10-x-9-x-175-inch-top-white-paper-triangle-pizza-box-3-ply"
  },
  {
    "sourceId": 4868,
    "name": "100 ML White Paper Cup",
    "slug": "100-ml-white-paper-cup",
    "image": "100-ml-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Small Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "small-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/100-ml-white-paper-cup"
  },
  {
    "sourceId": 5876,
    "name": "1000 ML Aluminium Foil Laminated Paper Meal Box 135 X 111 X 75 MM (Top X Bottom X Height)",
    "slug": "1000-ml-aluminium-foil-laminated-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height",
    "image": "1000-ml-aluminium-foil-laminated-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1000-ml-aluminium-foil-laminated-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3115,
    "name": "1000 ML Aluminium Foil Laminated Paper Salad Bowl",
    "slug": "1000-ml-aluminium-foil-laminated-paper-salad-bowl",
    "image": "1000-ml-aluminium-foil-laminated-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/1000-ml-aluminium-foil-laminated-paper-salad-bowl"
  },
  {
    "sourceId": 5873,
    "name": "1000 ML Brown Kraft Paper Meal Box 135 X 111 X 75 MM (Top X Bottom X Height)",
    "slug": "1000-ml-brown-kraft-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height",
    "image": "1000-ml-brown-kraft-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1000-ml-brown-kraft-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5973,
    "name": "1000 ML Brown Recycle  Kraft Paper Salad Bowl",
    "slug": "1000-ml-brown-recycle-kraft-paper-salad-bowl",
    "image": "1000-ml-brown-recycle-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/1000-ml-brown-recycle-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 5288,
    "name": "1000 ML Brown Virgin Kraft Paper Salad Bowl",
    "slug": "1000-ml-brown-virgin-kraft-paper-salad-bowl",
    "image": "1000-ml-brown-virgin-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/1000-ml-brown-virgin-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 5870,
    "name": "1000 ML White Kraft Paper Meal Box 135 X 111 X 75 MM (Top X Bottom X Height)",
    "slug": "1000-ml-white-kraft-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height",
    "image": "1000-ml-white-kraft-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1000-ml-white-kraft-paper-meal-box-135-x-111-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5293,
    "name": "1000 ML White Kraft Paper Salad Bowl",
    "slug": "1000-ml-white-kraft-paper-salad-bowl",
    "image": "1000-ml-white-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/1000-ml-white-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 5556,
    "name": "1050 ML Aluminium Foil Laminated Paper Meal Box 175 X 135 X 55 MM (Top X Bottom X Height)",
    "slug": "1050-ml-aluminium-foil-laminated-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height",
    "image": "1050-ml-aluminium-foil-laminated-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1050-ml-aluminium-foil-laminated-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5718,
    "name": "1050 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 175 X 135 X 55 MM (Top X Bottom X Height)",
    "slug": "1050-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height",
    "image": "1050-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1050-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5368,
    "name": "1050 ML Brown Kraft Paper Meal Box 175 X 135 X 55 MM (Top X Bottom X Height)",
    "slug": "1050-ml-brown-kraft-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height",
    "image": "1050-ml-brown-kraft-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1050-ml-brown-kraft-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5370,
    "name": "1050 ML Brown Kraft Paper Meal Box With Transparent Window 175 X 135 X 55 MM (Top X Bottom X Height)",
    "slug": "1050-ml-brown-kraft-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height",
    "image": "1050-ml-brown-kraft-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1050-ml-brown-kraft-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5369,
    "name": "1050 ML White Kraft Paper Meal Box 175 X 135 X 55 MM (Top X Bottom X Height)",
    "slug": "1050-ml-white-kraft-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height",
    "image": "1050-ml-white-kraft-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1050-ml-white-kraft-paper-meal-box-175-x-135-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5371,
    "name": "1050 ML White Kraft Paper Meal Box With Transparent Window 175 X 135 X 55 MM (Top X Bottom X Height)",
    "slug": "1050-ml-white-kraft-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height",
    "image": "1050-ml-white-kraft-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1050-ml-white-kraft-paper-meal-box-with-transparent-window-175-x-135-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5948,
    "name": "11 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "11-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "11-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/11-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4246,
    "name": "11 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "11-inch-brown-paper-pizza-box-3-ply",
    "image": "11-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/11-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4272,
    "name": "11 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "11-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "11-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/11-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5961,
    "name": "11 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "11-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "11-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/11-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4259,
    "name": "11 Inch White Paper Pizza Box 3 Ply",
    "slug": "11-inch-white-paper-pizza-box-3-ply",
    "image": "11-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/11-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4283,
    "name": "11 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "11-inch-white-paper-premium-pizza-box-3-ply",
    "image": "11-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/11-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5557,
    "name": "1100 ML Aluminium Foil Laminated Paper Meal Box 198 X 138 X 50 MM (Top X Bottom X Height)",
    "slug": "1100-ml-aluminium-foil-laminated-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height",
    "image": "1100-ml-aluminium-foil-laminated-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1100-ml-aluminium-foil-laminated-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5719,
    "name": "1100 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 198 X 138 X 50 MM (Top X Bottom X Height)",
    "slug": "1100-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height",
    "image": "1100-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1100-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5171,
    "name": "1100 ML Brown Kraft Paper Meal Box 198 X 138 X 50 MM (Top X Bottom X Height)",
    "slug": "1100-ml-brown-kraft-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height",
    "image": "1100-ml-brown-kraft-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1100-ml-brown-kraft-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5174,
    "name": "1100 ML Brown Kraft Paper Meal Box With Transparent Window 198 X 138 X 50 MM (Top X Bottom X Height)",
    "slug": "1100-ml-brown-kraft-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height",
    "image": "1100-ml-brown-kraft-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1100-ml-brown-kraft-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5172,
    "name": "1100 ML White Kraft Paper Meal Box 198 X 138 X 50 MM (Top X Bottom X Height)",
    "slug": "1100-ml-white-kraft-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height",
    "image": "1100-ml-white-kraft-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1100-ml-white-kraft-paper-meal-box-198-x-138-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5173,
    "name": "1100 ML White Kraft Paper Meal Box With Transparent Window 198 X 138 X 50 MM (Top X Bottom X Height)",
    "slug": "1100-ml-white-kraft-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height",
    "image": "1100-ml-white-kraft-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1100-ml-white-kraft-paper-meal-box-with-transparent-window-198-x-138-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5877,
    "name": "1160 ML Aluminium Foil Laminated Paper Meal Box 170 X 153 X 56 MM (Top X Bottom X Height)",
    "slug": "1160-ml-aluminium-foil-laminated-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height",
    "image": "1160-ml-aluminium-foil-laminated-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1160-ml-aluminium-foil-laminated-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5874,
    "name": "1160 ML Brown Kraft Paper Meal Box 170 X 153 X 56 MM (Top X Bottom X Height)",
    "slug": "1160-ml-brown-kraft-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height",
    "image": "1160-ml-brown-kraft-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1160-ml-brown-kraft-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5871,
    "name": "1160 ML White Kraft Paper Meal Box 170 X 153 X 56 MM (Top X Bottom X Height)",
    "slug": "1160-ml-white-kraft-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height",
    "image": "1160-ml-white-kraft-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1160-ml-white-kraft-paper-meal-box-170-x-153-x-56-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5949,
    "name": "12 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "12-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "12-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/12-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4247,
    "name": "12 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "12-inch-brown-paper-pizza-box-3-ply",
    "image": "12-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/12-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4273,
    "name": "12 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "12-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "12-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/12-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5962,
    "name": "12 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "12-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "12-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/12-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4260,
    "name": "12 Inch White Paper Pizza Box 3 Ply",
    "slug": "12-inch-white-paper-pizza-box-3-ply",
    "image": "12-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/12-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4284,
    "name": "12 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "12-inch-white-paper-premium-pizza-box-3-ply",
    "image": "12-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/12-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5125,
    "name": "12 x 9 x 1.75 Inch Brown Paper Triangle Pizza Box 3 Ply",
    "slug": "12-x-9-x-175-inch-brown-paper-triangle-pizza-box-3-ply",
    "image": "12-x-9-x-175-inch-brown-paper-triangle-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Triangle Shape Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "triangle-shape-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/12-x-9-x-175-inch-brown-paper-triangle-pizza-box-3-ply"
  },
  {
    "sourceId": 5127,
    "name": "12 x 9 x 1.75 Inch Top White Paper Triangle Pizza Box 3 Ply",
    "slug": "12-x-9-x-175-inch-top-white-paper-triangle-pizza-box-3-ply",
    "image": "12-x-9-x-175-inch-top-white-paper-triangle-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Triangle Shape Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "triangle-shape-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/12-x-9-x-175-inch-top-white-paper-triangle-pizza-box-3-ply"
  },
  {
    "sourceId": 5590,
    "name": "1200 ML Aluminium Foil Laminated Paper Two Compartment Food Box 198 X 138 X 55 MM (Top X Bottom X Height)",
    "slug": "1200-ml-aluminium-foil-laminated-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height",
    "image": "1200-ml-aluminium-foil-laminated-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/1200-ml-aluminium-foil-laminated-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5381,
    "name": "1200 ML Brown Kraft Paper Two Compartment Food Box 198 X 138 X 55 MM (Top X Bottom X Height)",
    "slug": "1200-ml-brown-kraft-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height",
    "image": "1200-ml-brown-kraft-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/1200-ml-brown-kraft-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5444,
    "name": "1200 ML White Kraft Paper Two Compartment Food Box 198 X 138 X 55 MM (Top X Bottom X Height)",
    "slug": "1200-ml-white-kraft-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height",
    "image": "1200-ml-white-kraft-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/1200-ml-white-kraft-paper-two-compartment-food-box-198-x-138-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5558,
    "name": "1250 ML Aluminium Foil Laminated Paper Meal Box 165 X 135 X 65 MM (Top X Bottom X Height)",
    "slug": "1250-ml-aluminium-foil-laminated-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height",
    "image": "1250-ml-aluminium-foil-laminated-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1250-ml-aluminium-foil-laminated-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5720,
    "name": "1250 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 165 X 135 X 65 MM (Top X Bottom X Height)",
    "slug": "1250-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height",
    "image": "1250-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1250-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5334,
    "name": "1250 ML Brown Kraft Paper Meal Box 165 X 135 X 65 MM (Top X Bottom X Height)",
    "slug": "1250-ml-brown-kraft-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height",
    "image": "1250-ml-brown-kraft-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1250-ml-brown-kraft-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5336,
    "name": "1250 ML Brown Kraft Paper Meal Box With Transparent Window 165 X 135 X 65 MM (Top X Bottom X Height)",
    "slug": "1250-ml-brown-kraft-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height",
    "image": "1250-ml-brown-kraft-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1250-ml-brown-kraft-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5335,
    "name": "1250 ML White Kraft Paper Meal Box 165 X 135 X 65 MM (Top X Bottom X Height)",
    "slug": "1250-ml-white-kraft-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height",
    "image": "1250-ml-white-kraft-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1250-ml-white-kraft-paper-meal-box-165-x-135-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5337,
    "name": "1250 ML White Kraft Paper Meal Box With Transparent Window 165 X 135 X 65 MM (Top X Bottom X Height)",
    "slug": "1250-ml-white-kraft-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height",
    "image": "1250-ml-white-kraft-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1250-ml-white-kraft-paper-meal-box-with-transparent-window-165-x-135-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5950,
    "name": "13 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "13-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "13-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/13-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4248,
    "name": "13 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "13-inch-brown-paper-pizza-box-3-ply",
    "image": "13-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/13-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4274,
    "name": "13 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "13-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "13-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/13-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5963,
    "name": "13 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "13-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "13-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/13-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4261,
    "name": "13 Inch White Paper Pizza Box 3 Ply",
    "slug": "13-inch-white-paper-pizza-box-3-ply",
    "image": "13-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/13-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4285,
    "name": "13 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "13-inch-white-paper-premium-pizza-box-3-ply",
    "image": "13-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/13-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5907,
    "name": "13 x 6.70 x 3.15 Inch 3 Ply Corrugated Brown Kraft  Paper Food Box",
    "slug": "13-x-670-x-315-inch-3-ply-corrugated-brown-kraft-paper-food-box",
    "image": "13-x-670-x-315-inch-3-ply-corrugated-brown-kraft-paper-food-box.webp",
    "unit": "Piece",
    "sourceCategory": "Rectangle Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "rectangle-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/13-x-670-x-315-inch-3-ply-corrugated-brown-kraft-paper-food-box"
  },
  {
    "sourceId": 5908,
    "name": "13 x 6.70 x 3.15 Inch 3 Ply Corrugated White Kraft  Paper Food Box",
    "slug": "13-x-670-x-315-inch-3-ply-corrugated-white-kraft-paper-food-box",
    "image": "13-x-670-x-315-inch-3-ply-corrugated-white-kraft-paper-food-box.webp",
    "unit": "Piece",
    "sourceCategory": "Rectangle Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "rectangle-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/13-x-670-x-315-inch-3-ply-corrugated-white-kraft-paper-food-box"
  },
  {
    "sourceId": 5951,
    "name": "14 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "14-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "14-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/14-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4249,
    "name": "14 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "14-inch-brown-paper-pizza-box-3-ply",
    "image": "14-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/14-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4275,
    "name": "14 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "14-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "14-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/14-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5964,
    "name": "14 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "14-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "14-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/14-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4262,
    "name": "14 Inch White Paper Pizza Box 3 Ply",
    "slug": "14-inch-white-paper-pizza-box-3-ply",
    "image": "14-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/14-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4286,
    "name": "14 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "14-inch-white-paper-premium-pizza-box-3-ply",
    "image": "14-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/14-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5559,
    "name": "1400 ML Aluminium Foil Laminated Paper Meal Box 173 X 140 X 65 MM (Top X Bottom X Height)",
    "slug": "1400-ml-aluminium-foil-laminated-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height",
    "image": "1400-ml-aluminium-foil-laminated-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1400-ml-aluminium-foil-laminated-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5721,
    "name": "1400 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 173 X 140 X 65 MM (Top X Bottom X Height)",
    "slug": "1400-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height",
    "image": "1400-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1400-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5341,
    "name": "1400 ML Brown Kraft Paper Meal Box 173 X 140 X 65 MM (Top X Bottom X Height)",
    "slug": "1400-ml-brown-kraft-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height",
    "image": "1400-ml-brown-kraft-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1400-ml-brown-kraft-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5343,
    "name": "1400 ML Brown Kraft Paper Meal Box With Transparent Window 173 X 140 X 65 MM (Top X Bottom X Height)",
    "slug": "1400-ml-brown-kraft-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height",
    "image": "1400-ml-brown-kraft-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1400-ml-brown-kraft-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5342,
    "name": "1400 ML White Kraft Paper Meal Box 173 X 140 X 65 MM (Top X Bottom X Height)",
    "slug": "1400-ml-white-kraft-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height",
    "image": "1400-ml-white-kraft-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1400-ml-white-kraft-paper-meal-box-173-x-140-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5344,
    "name": "1400 ML White Kraft Paper Meal Box With Transparent Window 173 X 140 X 65 MM (Top X Bottom X Height)",
    "slug": "1400-ml-white-kraft-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height",
    "image": "1400-ml-white-kraft-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1400-ml-white-kraft-paper-meal-box-with-transparent-window-173-x-140-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5560,
    "name": "1450 ML Aluminium Foil Laminated Paper Meal Box 215 X 160 X 50 MM (Top X Bottom X Height)",
    "slug": "1450-ml-aluminium-foil-laminated-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height",
    "image": "1450-ml-aluminium-foil-laminated-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1450-ml-aluminium-foil-laminated-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5722,
    "name": "1450 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 215 X 160 X 50 MM (Top X Bottom X Height)",
    "slug": "1450-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height",
    "image": "1450-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1450-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3327,
    "name": "1450 ML Brown Kraft Paper Meal Box 215 X 160 X 50 MM (Top X Bottom X Height)",
    "slug": "1450-ml-brown-kraft-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height",
    "image": "1450-ml-brown-kraft-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1450-ml-brown-kraft-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3330,
    "name": "1450 ML Brown Kraft Paper Meal Box With Transparent Window 215 X 160 X 50 MM (Top X Bottom X Height)",
    "slug": "1450-ml-brown-kraft-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height",
    "image": "1450-ml-brown-kraft-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1450-ml-brown-kraft-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3548,
    "name": "1450 ML White Kraft Paper Meal Box 215 X 160 X 50 MM (Top X Bottom X Height)",
    "slug": "1450-ml-white-kraft-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height",
    "image": "1450-ml-white-kraft-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1450-ml-white-kraft-paper-meal-box-215-x-160-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3555,
    "name": "1450 ML White Kraft Paper Meal Box With Transparent Window 215 X 160 X 50 MM (Top X Bottom X Height)",
    "slug": "1450-ml-white-kraft-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height",
    "image": "1450-ml-white-kraft-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1450-ml-white-kraft-paper-meal-box-with-transparent-window-215-x-160-x-50-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5522,
    "name": "148.50 MM PET Lid for Paper Salad Bowl (  500 ML / 750 ML / 1000 ML )",
    "slug": "14850-mm-pet-lid-for-paper-salad-bowl-500-ml-750-ml-1000-ml-86",
    "image": "14850-mm-pet-lid-for-paper-salad-bowl-500-ml-750-ml-1000-ml-86.webp",
    "unit": "Piece",
    "sourceCategory": "BOWL LID",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "bowl-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/14850-mm-pet-lid-for-paper-salad-bowl-500-ml-750-ml-1000-ml-86"
  },
  {
    "sourceId": 5521,
    "name": "148.50 MM PP Lid for Paper Salad Bowl ( 500 ML / 750  ML / 1000 ML )",
    "slug": "14850-mm-pp-lid-for-paper-salad-bowl-500-ml-750-ml-1000-ml-15",
    "image": "14850-mm-pp-lid-for-paper-salad-bowl-500-ml-750-ml-1000-ml-15.webp",
    "unit": "Piece",
    "sourceCategory": "BOWL LID",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "bowl-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/14850-mm-pp-lid-for-paper-salad-bowl-500-ml-750-ml-1000-ml-15"
  },
  {
    "sourceId": 5952,
    "name": "15 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "15-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "15-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/15-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4251,
    "name": "15 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "15-inch-brown-paper-pizza-box-3-ply",
    "image": "15-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/15-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4276,
    "name": "15 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "15-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "15-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/15-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5965,
    "name": "15 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "15-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "15-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/15-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4263,
    "name": "15 Inch White Paper Pizza Box 3 Ply",
    "slug": "15-inch-white-paper-pizza-box-3-ply",
    "image": "15-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/15-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4287,
    "name": "15 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "15-inch-white-paper-premium-pizza-box-3-ply",
    "image": "15-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/15-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 3544,
    "name": "150 ML White Paper Cup",
    "slug": "150-ml-white-paper-cup",
    "image": "150-ml-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Small Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "small-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/150-ml-white-paper-cup"
  },
  {
    "sourceId": 5953,
    "name": "16 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "16-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "16-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/16-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4252,
    "name": "16 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "16-inch-brown-paper-pizza-box-3-ply",
    "image": "16-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/16-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4277,
    "name": "16 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "16-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "16-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/16-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5966,
    "name": "16 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "16-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "16-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/16-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4264,
    "name": "16 Inch White Paper Pizza Box 3 Ply",
    "slug": "16-inch-white-paper-pizza-box-3-ply",
    "image": "16-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/16-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4288,
    "name": "16 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "16-inch-white-paper-premium-pizza-box-3-ply",
    "image": "16-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/16-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5561,
    "name": "1600 ML Aluminium Foil Laminated Paper Meal Box 200 X 150 X 60 MM (Top X Bottom X Height)",
    "slug": "1600-ml-aluminium-foil-laminated-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height",
    "image": "1600-ml-aluminium-foil-laminated-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1600-ml-aluminium-foil-laminated-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5723,
    "name": "1600 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 200 X 150 X 60 MM (Top X Bottom X Height)",
    "slug": "1600-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height",
    "image": "1600-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1600-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3513,
    "name": "1600 ML Brown Kraft Paper Meal Box 200 X 150 X 60 MM (Top X Bottom X Height)",
    "slug": "1600-ml-brown-kraft-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height",
    "image": "1600-ml-brown-kraft-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1600-ml-brown-kraft-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3983,
    "name": "1600 ML Brown Kraft Paper Meal Box With Transparent Window 200 X 150 X 60 MM (Top X Bottom X Height)",
    "slug": "1600-ml-brown-kraft-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height",
    "image": "1600-ml-brown-kraft-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1600-ml-brown-kraft-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3550,
    "name": "1600 ML White Kraft Paper Meal Box 200 X 150 X 60 MM (Top X Bottom X Height)",
    "slug": "1600-ml-white-kraft-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height",
    "image": "1600-ml-white-kraft-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/1600-ml-white-kraft-paper-meal-box-200-x-150-x-60-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3984,
    "name": "1600 ML White Kraft Paper Meal Box With Transparent Window 200 X 150 X 60 MM (Top X Bottom X Height)",
    "slug": "1600-ml-white-kraft-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height",
    "image": "1600-ml-white-kraft-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/1600-ml-white-kraft-paper-meal-box-with-transparent-window-200-x-150-x-60-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5954,
    "name": "17 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "17-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "17-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/17-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4253,
    "name": "17 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "17-inch-brown-paper-pizza-box-3-ply",
    "image": "17-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/17-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4278,
    "name": "17 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "17-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "17-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/17-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5967,
    "name": "17 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "17-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "17-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/17-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4265,
    "name": "17 Inch White Paper Pizza Box 3 Ply",
    "slug": "17-inch-white-paper-pizza-box-3-ply",
    "image": "17-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/17-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4289,
    "name": "17 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "17-inch-white-paper-premium-pizza-box-3-ply",
    "image": "17-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/17-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5955,
    "name": "18 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "18-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "18-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/18-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4267,
    "name": "18 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "18-inch-brown-paper-pizza-box-3-ply",
    "image": "18-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/18-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4291,
    "name": "18 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "18-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "18-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/18-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5968,
    "name": "18 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "18-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "18-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/18-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4266,
    "name": "18 Inch White Paper Pizza Box 3 Ply",
    "slug": "18-inch-white-paper-pizza-box-3-ply",
    "image": "18-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/18-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4290,
    "name": "18 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "18-inch-white-paper-premium-pizza-box-3-ply",
    "image": "18-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/18-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5956,
    "name": "19 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "19-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "19-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/19-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4896,
    "name": "19 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "19-inch-brown-paper-pizza-box-3-ply",
    "image": "19-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/19-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 5969,
    "name": "19 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "19-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "19-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/19-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4897,
    "name": "19 Inch White Paper Pizza Box 3 Ply",
    "slug": "19-inch-white-paper-pizza-box-3-ply",
    "image": "19-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/19-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 5957,
    "name": "20 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "20-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "20-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/20-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 5445,
    "name": "20 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "20-inch-brown-paper-pizza-box-3-ply",
    "image": "20-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/20-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 5970,
    "name": "20 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "20-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "20-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/20-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 5446,
    "name": "20 Inch White Paper Pizza Box 3 Ply",
    "slug": "20-inch-white-paper-pizza-box-3-ply",
    "image": "20-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/20-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 5562,
    "name": "2000 ML Aluminium Foil Laminated Paper Meal Box 216 X 160 X 65 MM (Top X Bottom X Height)",
    "slug": "2000-ml-aluminium-foil-laminated-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height",
    "image": "2000-ml-aluminium-foil-laminated-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/2000-ml-aluminium-foil-laminated-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5724,
    "name": "2000 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 216 X 160 X 65 MM (Top X Bottom X Height)",
    "slug": "2000-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height",
    "image": "2000-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/2000-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3328,
    "name": "2000 ML Brown Kraft Paper Meal Box 216 X 160 X 65 MM (Top X Bottom X Height)",
    "slug": "2000-ml-brown-kraft-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height",
    "image": "2000-ml-brown-kraft-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/2000-ml-brown-kraft-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3331,
    "name": "2000 ML Brown Kraft Paper Meal Box With Transparent Window 216 X 160 X 65 MM (Top X Bottom X Height)",
    "slug": "2000-ml-brown-kraft-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height",
    "image": "2000-ml-brown-kraft-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/2000-ml-brown-kraft-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3549,
    "name": "2000 ML White Kraft Paper Meal Box 216 X 160 X 65 MM (Top X Bottom X Height)",
    "slug": "2000-ml-white-kraft-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height",
    "image": "2000-ml-white-kraft-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/2000-ml-white-kraft-paper-meal-box-216-x-160-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3556,
    "name": "2000 ML White Kraft Paper Meal Box With Transparent Window 216 X 160 X 65 MM (Top X Bottom X Height)",
    "slug": "2000-ml-white-kraft-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height",
    "image": "2000-ml-white-kraft-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/2000-ml-white-kraft-paper-meal-box-with-transparent-window-216-x-160-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5523,
    "name": "226 ML Aluminium Foil Laminated Paper Food Container 6 Oz",
    "slug": "226-ml-aluminium-foil-laminated-paper-food-container-6-oz",
    "image": "226-ml-aluminium-foil-laminated-paper-food-container-6-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/226-ml-aluminium-foil-laminated-paper-food-container-6-oz"
  },
  {
    "sourceId": 5975,
    "name": "226 ML Brown Recycle Kraft Paper Food Container 6 Oz",
    "slug": "226-ml-brown-recycle-kraft-paper-food-container-6-oz",
    "image": "226-ml-brown-recycle-kraft-paper-food-container-6-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/226-ml-brown-recycle-kraft-paper-food-container-6-oz"
  },
  {
    "sourceId": 5399,
    "name": "226 ML Brown Virgin Kraft Paper Food Container 6 Oz",
    "slug": "226-ml-brown-virgin-kraft-paper-food-container-6-oz",
    "image": "226-ml-brown-virgin-kraft-paper-food-container-6-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/226-ml-brown-virgin-kraft-paper-food-container-6-oz"
  },
  {
    "sourceId": 5404,
    "name": "226 ML White Paper Food Container  6 Oz",
    "slug": "226-ml-white-paper-food-container-6-oz",
    "image": "226-ml-white-paper-food-container-6-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/226-ml-white-paper-food-container-6-oz"
  },
  {
    "sourceId": 5981,
    "name": "24 X 34 CM White Recycle Sandwich Wrapping Paper",
    "slug": "24-x-34-cm-white-recycle-sandwich-wrapping-paper",
    "image": "24-x-34-cm-white-recycle-sandwich-wrapping-paper.webp",
    "unit": "Box",
    "sourceCategory": "White Recycle Sandwich Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "white-recycle-sandwich-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/24-x-34-cm-white-recycle-sandwich-wrapping-paper"
  },
  {
    "sourceId": 5052,
    "name": "25 Inch Brown Paper Top & Bottom Pizza Box 3 Ply",
    "slug": "25-inch-brown-paper-top-bottom-pizza-box-3-ply",
    "image": "25-inch-brown-paper-top-bottom-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Jumbo Size Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "jumbo-size-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/25-inch-brown-paper-top-bottom-pizza-box-3-ply"
  },
  {
    "sourceId": 5053,
    "name": "25 Inch White Paper Top & Bottom Pizza Box 3 Ply",
    "slug": "25-inch-white-paper-top-bottom-pizza-box-3-ply",
    "image": "25-inch-white-paper-top-bottom-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Jumbo Size Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "jumbo-size-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/25-inch-white-paper-top-bottom-pizza-box-3-ply"
  },
  {
    "sourceId": 5735,
    "name": "25 X 25 CM Baking Paper For Multi Baking",
    "slug": "25-x-25-cm-baking-paper-for-multi-baking",
    "image": "25-x-25-cm-baking-paper-for-multi-baking.webp",
    "unit": "Kg",
    "sourceCategory": "Baking Paper Sheet",
    "sourceParentCategory": "BAKE OVEN PAPER",
    "sourceCategorySlug": "baking-paper-sheet",
    "sourceUrl": "https://www.gujaratshopee.com/product/25-x-25-cm-baking-paper-for-multi-baking"
  },
  {
    "sourceId": 5574,
    "name": "25 X 25 CM Brown Food Wrapping Grease Proof Paper (7 Kit Value)",
    "slug": "25-x-25-cm-brown-food-wrapping-grease-proof-paper-7-kit-value",
    "image": "25-x-25-cm-brown-food-wrapping-grease-proof-paper-7-kit-value.webp",
    "unit": "Kg",
    "sourceCategory": "Brown Food Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "brown-food-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/25-x-25-cm-brown-food-wrapping-grease-proof-paper-7-kit-value"
  },
  {
    "sourceId": 5573,
    "name": "25 X 25 CM White Food Wrapping Grease Proof Paper (7 Kit Value)",
    "slug": "25-x-25-cm-white-food-wrapping-grease-proof-paper-7-kit-value",
    "image": "25-x-25-cm-white-food-wrapping-grease-proof-paper-7-kit-value.webp",
    "unit": "Kg",
    "sourceCategory": "White Food Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "white-food-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/25-x-25-cm-white-food-wrapping-grease-proof-paper-7-kit-value"
  },
  {
    "sourceId": 5858,
    "name": "250 Ml (8 OZ) Double Wall Black Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-black-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-black-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-black-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5853,
    "name": "250 Ml (8 OZ) Double Wall Blue Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-blue-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-blue-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-blue-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5891,
    "name": "250 Ml (8 OZ) Double Wall Brown Kraft Brown Paper Cup",
    "slug": "250-ml-8-oz-double-wall-brown-kraft-brown-paper-cup",
    "image": "250-ml-8-oz-double-wall-brown-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-brown-kraft-brown-paper-cup"
  },
  {
    "sourceId": 5254,
    "name": "250 Ml (8 OZ) Double Wall Brown Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-brown-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-brown-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-brown-kraft-white-paper-cup"
  },
  {
    "sourceId": 5859,
    "name": "250 Ml (8 OZ) Double Wall Dark Magenta Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-dark-magenta-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-dark-magenta-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-dark-magenta-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5854,
    "name": "250 Ml (8 OZ) Double Wall Green Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-green-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-green-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-green-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5851,
    "name": "250 Ml (8 OZ) Double Wall Orange Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-orange-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-orange-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-orange-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5856,
    "name": "250 Ml (8 OZ) Double Wall Parrot Green Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-parrot-green-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-parrot-green-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-parrot-green-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5857,
    "name": "250 Ml (8 OZ) Double Wall Pink Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-pink-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-pink-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-pink-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5852,
    "name": "250 Ml (8 OZ) Double Wall Red Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-red-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-red-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-red-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5890,
    "name": "250 Ml (8 OZ) Double Wall White Kraft Brown Paper Cup",
    "slug": "250-ml-8-oz-double-wall-white-kraft-brown-paper-cup",
    "image": "250-ml-8-oz-double-wall-white-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-white-kraft-brown-paper-cup"
  },
  {
    "sourceId": 4106,
    "name": "250 Ml (8 OZ) Double Wall White Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-white-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-white-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-white-kraft-white-paper-cup"
  },
  {
    "sourceId": 5855,
    "name": "250 Ml (8 OZ) Double Wall Yellow Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-double-wall-yellow-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-double-wall-yellow-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-double-wall-yellow-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5899,
    "name": "250 Ml (8 OZ) Ripple Wall Black Kraft Brown Paper Cup",
    "slug": "250-ml-8-oz-ripple-wall-black-kraft-brown-paper-cup",
    "image": "250-ml-8-oz-ripple-wall-black-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-ripple-wall-black-kraft-brown-paper-cup"
  },
  {
    "sourceId": 5832,
    "name": "250 Ml (8 OZ) Ripple Wall Black Kraft White Paper Cup",
    "slug": "250-ml-8-oz-ripple-wall-black-kraft-white-paper-cup",
    "image": "250-ml-8-oz-ripple-wall-black-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-ripple-wall-black-kraft-white-paper-cup"
  },
  {
    "sourceId": 5897,
    "name": "250 Ml (8 OZ) Ripple Wall Brown Kraft Brown Paper Cup",
    "slug": "250-ml-8-oz-ripple-wall-brown-kraft-brown-paper-cup",
    "image": "250-ml-8-oz-ripple-wall-brown-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-ripple-wall-brown-kraft-brown-paper-cup"
  },
  {
    "sourceId": 2703,
    "name": "250 Ml (8 OZ) Ripple Wall Brown Kraft White Paper Cup",
    "slug": "250-ml-8-oz-ripple-wall-brown-kraft-white-paper-cup",
    "image": "250-ml-8-oz-ripple-wall-brown-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-ripple-wall-brown-kraft-white-paper-cup"
  },
  {
    "sourceId": 5898,
    "name": "250 Ml (8 OZ) Ripple Wall White Kraft Brown Paper Cup",
    "slug": "250-ml-8-oz-ripple-wall-white-kraft-brown-paper-cup",
    "image": "250-ml-8-oz-ripple-wall-white-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-ripple-wall-white-kraft-brown-paper-cup"
  },
  {
    "sourceId": 5831,
    "name": "250 Ml (8 OZ) Ripple Wall White Kraft White Paper Cup",
    "slug": "250-ml-8-oz-ripple-wall-white-kraft-white-paper-cup",
    "image": "250-ml-8-oz-ripple-wall-white-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-ripple-wall-white-kraft-white-paper-cup"
  },
  {
    "sourceId": 5840,
    "name": "250 Ml (8 OZ) Single Wall Black Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-black-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-black-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-black-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5835,
    "name": "250 Ml (8 OZ) Single Wall Blue Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-blue-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-blue-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-blue-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5571,
    "name": "250 Ml (8 OZ) Single Wall Brown Kraft Paper Cup",
    "slug": "250-ml-8-oz-single-wall-brown-kraft-paper-cup",
    "image": "250-ml-8-oz-single-wall-brown-kraft-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-brown-kraft-paper-cup"
  },
  {
    "sourceId": 5841,
    "name": "250 Ml (8 OZ) Single Wall Dark Magenta Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-dark-magenta-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-dark-magenta-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-dark-magenta-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5836,
    "name": "250 Ml (8 OZ) Single Wall Green Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-green-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-green-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-green-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5833,
    "name": "250 Ml (8 OZ) Single Wall Orange Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-orange-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-orange-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-orange-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5838,
    "name": "250 Ml (8 OZ) Single Wall Parrot Green Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-parrot-green-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-parrot-green-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-parrot-green-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5839,
    "name": "250 Ml (8 OZ) Single Wall Pink Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-pink-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-pink-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-pink-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5834,
    "name": "250 Ml (8 OZ) Single Wall Red Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-red-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-red-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-red-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 165,
    "name": "250 Ml (8 OZ) Single Wall White Kraft Paper Cup",
    "slug": "250-ml-8-oz-single-wall-white-kraft-paper-cup",
    "image": "250-ml-8-oz-single-wall-white-kraft-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-white-kraft-paper-cup"
  },
  {
    "sourceId": 5837,
    "name": "250 Ml (8 OZ) Single Wall Yellow Coloured Kraft White Paper Cup",
    "slug": "250-ml-8-oz-single-wall-yellow-coloured-kraft-white-paper-cup",
    "image": "250-ml-8-oz-single-wall-yellow-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-8-oz-single-wall-yellow-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5524,
    "name": "250 ML Aluminium Foil Laminated Paper Food Container 8 Oz",
    "slug": "250-ml-aluminium-foil-laminated-paper-food-container-8-oz",
    "image": "250-ml-aluminium-foil-laminated-paper-food-container-8-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-aluminium-foil-laminated-paper-food-container-8-oz"
  },
  {
    "sourceId": 5530,
    "name": "250 ML Aluminium Foil Laminated Paper Noodle Wok Box  8 Oz",
    "slug": "250-ml-aluminium-foil-laminated-paper-noodle-wok-box-8-oz",
    "image": "250-ml-aluminium-foil-laminated-paper-noodle-wok-box-8-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-aluminium-foil-laminated-paper-noodle-wok-box-8-oz"
  },
  {
    "sourceId": 5097,
    "name": "250 ML Brown Kraft Paper Noodle Wok Box 8 Oz",
    "slug": "250-ml-brown-kraft-paper-noodle-wok-box-8-oz",
    "image": "250-ml-brown-kraft-paper-noodle-wok-box-8-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-brown-kraft-paper-noodle-wok-box-8-oz"
  },
  {
    "sourceId": 5976,
    "name": "250 ML Brown Recycle Kraft Paper Food Container 8 Oz",
    "slug": "250-ml-brown-recycle-kraft-paper-food-container-8-oz",
    "image": "250-ml-brown-recycle-kraft-paper-food-container-8-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-brown-recycle-kraft-paper-food-container-8-oz"
  },
  {
    "sourceId": 5400,
    "name": "250 ML Brown Virgin Kraft Paper Food Container 8 Oz",
    "slug": "250-ml-brown-virgin-kraft-paper-food-container-8-oz",
    "image": "250-ml-brown-virgin-kraft-paper-food-container-8-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-brown-virgin-kraft-paper-food-container-8-oz"
  },
  {
    "sourceId": 5099,
    "name": "250 ML White Kraft Paper Noodle Wok Box 8 Oz",
    "slug": "250-ml-white-kraft-paper-noodle-wok-box-8-oz",
    "image": "250-ml-white-kraft-paper-noodle-wok-box-8-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-white-kraft-paper-noodle-wok-box-8-oz"
  },
  {
    "sourceId": 5405,
    "name": "250 ML White Paper Food Container 8 Oz",
    "slug": "250-ml-white-paper-food-container-8-oz",
    "image": "250-ml-white-paper-food-container-8-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/250-ml-white-paper-food-container-8-oz"
  },
  {
    "sourceId": 5563,
    "name": "2900 ML Aluminium Foil Laminated Paper Meal Box 216 X 160 X 90 MM (Top X Bottom X Height)",
    "slug": "2900-ml-aluminium-foil-laminated-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height",
    "image": "2900-ml-aluminium-foil-laminated-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/2900-ml-aluminium-foil-laminated-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5725,
    "name": "2900 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 216 X 160 X 90 MM (Top X Bottom X Height)",
    "slug": "2900-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height",
    "image": "2900-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/2900-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5155,
    "name": "2900 ML Brown Kraft Paper Meal Box 216 X 160 X 90 MM (Top X Bottom X Height)",
    "slug": "2900-ml-brown-kraft-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height",
    "image": "2900-ml-brown-kraft-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/2900-ml-brown-kraft-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5157,
    "name": "2900 ML Brown Kraft Paper Meal Box With Transparent Window 216 X 160 X 90 MM (Top X Bottom X Height)",
    "slug": "2900-ml-brown-kraft-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height",
    "image": "2900-ml-brown-kraft-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/2900-ml-brown-kraft-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5156,
    "name": "2900 ML White Kraft Paper Meal Box 216 X 160 X 90 MM (Top X Bottom X Height)",
    "slug": "2900-ml-white-kraft-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height",
    "image": "2900-ml-white-kraft-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/2900-ml-white-kraft-paper-meal-box-216-x-160-x-90-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5158,
    "name": "2900 ML White Kraft Paper Meal Box With Transparent Window 216 X 160 X 90 MM (Top X Bottom X Height)",
    "slug": "2900-ml-white-kraft-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height",
    "image": "2900-ml-white-kraft-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/2900-ml-white-kraft-paper-meal-box-with-transparent-window-216-x-160-x-90-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5689,
    "name": "3 Ply Corrugated Brown Kraft  Paper Garlic Bread Box 11 x 6 x 1.5 Inch",
    "slug": "3-ply-corrugated-brown-kraft-paper-garlic-bread-box-11-x-6-x-15-inch",
    "image": "3-ply-corrugated-brown-kraft-paper-garlic-bread-box-11-x-6-x-15-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Garlic Bread Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-garlic-bread-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/3-ply-corrugated-brown-kraft-paper-garlic-bread-box-11-x-6-x-15-inch"
  },
  {
    "sourceId": 4711,
    "name": "3 Ply Corrugated Brown Kraft  Paper Garlic Bread Box 9 x 6 x 1.5 Inch",
    "slug": "3-ply-corrugated-brown-kraft-paper-garlic-bread-box-9-x-6-x-15-inch",
    "image": "3-ply-corrugated-brown-kraft-paper-garlic-bread-box-9-x-6-x-15-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Garlic Bread Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-garlic-bread-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/3-ply-corrugated-brown-kraft-paper-garlic-bread-box-9-x-6-x-15-inch"
  },
  {
    "sourceId": 5587,
    "name": "3 Ply Corrugated Brown Kraft Paper Dosa Box 13.75 x 9.25 x 3 Inch",
    "slug": "3-ply-corrugated-brown-kraft-paper-dosa-box-1375-x-925-x-3-inch",
    "image": "3-ply-corrugated-brown-kraft-paper-dosa-box-1375-x-925-x-3-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Dosa Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-dosa-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/3-ply-corrugated-brown-kraft-paper-dosa-box-1375-x-925-x-3-inch"
  },
  {
    "sourceId": 4864,
    "name": "3 Ply Corrugated Top White Kraft Paper Dosa Box 13.75 x 9.25 x 3 Inch",
    "slug": "3-ply-corrugated-top-white-kraft-paper-dosa-box-1375-x-925-x-3-inch",
    "image": "3-ply-corrugated-top-white-kraft-paper-dosa-box-1375-x-925-x-3-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Dosa Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-dosa-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/3-ply-corrugated-top-white-kraft-paper-dosa-box-1375-x-925-x-3-inch"
  },
  {
    "sourceId": 5690,
    "name": "3 Ply Corrugated White Kraft Paper Garlic Bread Box 11 x 6 x 1.5 Inch",
    "slug": "3-ply-corrugated-white-kraft-paper-garlic-bread-box-11-x-6-x-15-inch",
    "image": "3-ply-corrugated-white-kraft-paper-garlic-bread-box-11-x-6-x-15-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Garlic Bread Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-garlic-bread-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/3-ply-corrugated-white-kraft-paper-garlic-bread-box-11-x-6-x-15-inch"
  },
  {
    "sourceId": 4712,
    "name": "3 Ply Corrugated White Kraft Paper Garlic Bread Box 9 x 6 x 1.5 Inch",
    "slug": "3-ply-corrugated-white-kraft-paper-garlic-bread-box-9-x-6-x-15-inch",
    "image": "3-ply-corrugated-white-kraft-paper-garlic-bread-box-9-x-6-x-15-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Garlic Bread Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-garlic-bread-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/3-ply-corrugated-white-kraft-paper-garlic-bread-box-9-x-6-x-15-inch"
  },
  {
    "sourceId": 3294,
    "name": "3 Ply Top Brown Kraft Paper Four Container Holder Tray",
    "slug": "3-ply-top-brown-kraft-paper-four-container-holder-tray",
    "image": "3-ply-top-brown-kraft-paper-four-container-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Container Holder Tray",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-container-holder-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/3-ply-top-brown-kraft-paper-four-container-holder-tray"
  },
  {
    "sourceId": 3951,
    "name": "3 Ply Top White Paper Four Container Holder Tray",
    "slug": "3-ply-top-white-paper-four-container-holder-tray",
    "image": "3-ply-top-white-paper-four-container-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Container Holder Tray",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-container-holder-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/3-ply-top-white-paper-four-container-holder-tray"
  },
  {
    "sourceId": 5736,
    "name": "30 X 30 CM Baking Paper For Multi Baking",
    "slug": "30-x-30-cm-baking-paper-for-multi-baking",
    "image": "30-x-30-cm-baking-paper-for-multi-baking.webp",
    "unit": "Kg",
    "sourceCategory": "Baking Paper Sheet",
    "sourceParentCategory": "BAKE OVEN PAPER",
    "sourceCategorySlug": "baking-paper-sheet",
    "sourceUrl": "https://www.gujaratshopee.com/product/30-x-30-cm-baking-paper-for-multi-baking"
  },
  {
    "sourceId": 5729,
    "name": "30 X 30 CM Brown Food Wrapping Grease Proof Paper (7 Kit Value)",
    "slug": "30-x-30-cm-brown-food-wrapping-grease-proof-paper-7-kit-value",
    "image": "30-x-30-cm-brown-food-wrapping-grease-proof-paper-7-kit-value.webp",
    "unit": "Kg",
    "sourceCategory": "Brown Food Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "brown-food-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/30-x-30-cm-brown-food-wrapping-grease-proof-paper-7-kit-value"
  },
  {
    "sourceId": 5730,
    "name": "30 X 30 CM White Food Wrapping Grease Proof Paper (7 Kit Value)",
    "slug": "30-x-30-cm-white-food-wrapping-grease-proof-paper-7-kit-value",
    "image": "30-x-30-cm-white-food-wrapping-grease-proof-paper-7-kit-value.webp",
    "unit": "Kg",
    "sourceCategory": "White Food Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "white-food-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/30-x-30-cm-white-food-wrapping-grease-proof-paper-7-kit-value"
  },
  {
    "sourceId": 5549,
    "name": "300 ML Aluminium Foil Laminated Paper Meal Box 125 X 95 X 40 MM (Top X Bottom X Height)",
    "slug": "300-ml-aluminium-foil-laminated-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height",
    "image": "300-ml-aluminium-foil-laminated-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/300-ml-aluminium-foil-laminated-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5711,
    "name": "300 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 125 X 95 X 40 MM (Top X Bottom X Height)",
    "slug": "300-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height",
    "image": "300-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/300-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5023,
    "name": "300 ML Brown Kraft Paper Meal Box 125 X 95 X 40 MM (Top X Bottom X Height)",
    "slug": "300-ml-brown-kraft-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height",
    "image": "300-ml-brown-kraft-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/300-ml-brown-kraft-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5159,
    "name": "300 ML Brown Kraft Paper Meal Box With Transparent Window 125 X 95 X 40 MM (Top X Bottom X Height)",
    "slug": "300-ml-brown-kraft-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height",
    "image": "300-ml-brown-kraft-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/300-ml-brown-kraft-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5024,
    "name": "300 ML White Kraft Paper Meal Box 125 X 95 X 40 MM (Top X Bottom X Height)",
    "slug": "300-ml-white-kraft-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height",
    "image": "300-ml-white-kraft-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/300-ml-white-kraft-paper-meal-box-125-x-95-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5160,
    "name": "300 ML White Kraft Paper Meal Box With Transparent Window 125 X 95 X 40 MM (Top X Bottom X Height)",
    "slug": "300-ml-white-kraft-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height",
    "image": "300-ml-white-kraft-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/300-ml-white-kraft-paper-meal-box-with-transparent-window-125-x-95-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5525,
    "name": "350 ML Aluminium Foil Laminated Paper Food Container 6 Oz",
    "slug": "350-ml-aluminium-foil-laminated-paper-food-container-6-oz",
    "image": "350-ml-aluminium-foil-laminated-paper-food-container-6-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/350-ml-aluminium-foil-laminated-paper-food-container-6-oz"
  },
  {
    "sourceId": 5977,
    "name": "350 ML Brown Recycle Kraft Paper Food Container 12 Oz",
    "slug": "350-ml-brown-recycle-kraft-paper-food-container-12-oz",
    "image": "350-ml-brown-recycle-kraft-paper-food-container-12-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/350-ml-brown-recycle-kraft-paper-food-container-12-oz"
  },
  {
    "sourceId": 5401,
    "name": "350 ML Brown Virgin Kraft Paper Food Container 12 Oz",
    "slug": "350-ml-brown-virgin-kraft-paper-food-container-12-oz",
    "image": "350-ml-brown-virgin-kraft-paper-food-container-12-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/350-ml-brown-virgin-kraft-paper-food-container-12-oz"
  },
  {
    "sourceId": 5406,
    "name": "350 ML White Paper Food Container 12 Oz",
    "slug": "350-ml-white-paper-food-container-12-oz",
    "image": "350-ml-white-paper-food-container-12-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/350-ml-white-paper-food-container-12-oz"
  },
  {
    "sourceId": 5867,
    "name": "360 Ml (12 OZ) Double Wall Black Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-black-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-black-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-black-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5862,
    "name": "360 Ml (12 OZ) Double Wall Blue Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-blue-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-blue-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-blue-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5893,
    "name": "360 Ml (12 OZ) Double Wall Brown Kraft Brown Paper Cup",
    "slug": "360-ml-12-oz-double-wall-brown-kraft-brown-paper-cup",
    "image": "360-ml-12-oz-double-wall-brown-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-brown-kraft-brown-paper-cup"
  },
  {
    "sourceId": 5255,
    "name": "360 Ml (12 OZ) Double Wall Brown Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-brown-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-brown-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-brown-kraft-white-paper-cup"
  },
  {
    "sourceId": 5868,
    "name": "360 Ml (12 OZ) Double Wall Dark Magenta Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-dark-magenta-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-dark-magenta-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-dark-magenta-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5863,
    "name": "360 Ml (12 OZ) Double Wall Green Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-green-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-green-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-green-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5860,
    "name": "360 Ml (12 OZ) Double Wall Orange Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-orange-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-orange-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-orange-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5865,
    "name": "360 Ml (12 OZ) Double Wall Parrot Green Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-parrot-green-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-parrot-green-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-parrot-green-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5866,
    "name": "360 Ml (12 OZ) Double Wall Pink Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-pink-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-pink-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-pink-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5861,
    "name": "360 Ml (12 OZ) Double Wall Red Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-red-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-red-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-red-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5892,
    "name": "360 Ml (12 OZ) Double Wall White Kraft Brown Paper Cup",
    "slug": "360-ml-12-oz-double-wall-white-kraft-brown-paper-cup",
    "image": "360-ml-12-oz-double-wall-white-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-white-kraft-brown-paper-cup"
  },
  {
    "sourceId": 4107,
    "name": "360 Ml (12 OZ) Double Wall White Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-white-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-white-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-white-kraft-white-paper-cup"
  },
  {
    "sourceId": 5864,
    "name": "360 Ml (12 OZ) Double Wall Yellow Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-double-wall-yellow-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-double-wall-yellow-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Double Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "double-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-double-wall-yellow-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5896,
    "name": "360 Ml (12 OZ) Ripple Wall Black Kraft Brown Paper Cup",
    "slug": "360-ml-12-oz-ripple-wall-black-kraft-brown-paper-cup",
    "image": "360-ml-12-oz-ripple-wall-black-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-ripple-wall-black-kraft-brown-paper-cup"
  },
  {
    "sourceId": 5830,
    "name": "360 Ml (12 OZ) Ripple Wall Black Kraft White Paper Cup",
    "slug": "360-ml-12-oz-ripple-wall-black-kraft-white-paper-cup",
    "image": "360-ml-12-oz-ripple-wall-black-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-ripple-wall-black-kraft-white-paper-cup"
  },
  {
    "sourceId": 5894,
    "name": "360 Ml (12 OZ) Ripple Wall Brown Kraft Brown Paper Cup",
    "slug": "360-ml-12-oz-ripple-wall-brown-kraft-brown-paper-cup",
    "image": "360-ml-12-oz-ripple-wall-brown-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-ripple-wall-brown-kraft-brown-paper-cup"
  },
  {
    "sourceId": 1131,
    "name": "360 Ml (12 OZ) Ripple Wall Brown Kraft White Paper Cup",
    "slug": "360-ml-12-oz-ripple-wall-brown-kraft-white-paper-cup",
    "image": "360-ml-12-oz-ripple-wall-brown-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-ripple-wall-brown-kraft-white-paper-cup"
  },
  {
    "sourceId": 5895,
    "name": "360 Ml (12 OZ) Ripple Wall White Kraft Brown Paper Cup",
    "slug": "360-ml-12-oz-ripple-wall-white-kraft-brown-paper-cup",
    "image": "360-ml-12-oz-ripple-wall-white-kraft-brown-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-ripple-wall-white-kraft-brown-paper-cup"
  },
  {
    "sourceId": 5829,
    "name": "360 Ml (12 OZ) Ripple Wall White Kraft White Paper Cup",
    "slug": "360-ml-12-oz-ripple-wall-white-kraft-white-paper-cup",
    "image": "360-ml-12-oz-ripple-wall-white-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Ripple Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "ripple-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-ripple-wall-white-kraft-white-paper-cup"
  },
  {
    "sourceId": 1134,
    "name": "360 Ml (12 OZ) Single  Wall White Kraft Paper Cup",
    "slug": "360-ml-12-oz-single-wall-white-kraft-paper-cup",
    "image": "360-ml-12-oz-single-wall-white-kraft-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-white-kraft-paper-cup"
  },
  {
    "sourceId": 5849,
    "name": "360 Ml (12 OZ) Single Wall Black Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-black-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-black-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-black-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5844,
    "name": "360 Ml (12 OZ) Single Wall Blue Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-blue-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-blue-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-blue-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5572,
    "name": "360 ML (12 OZ) Single Wall Brown Kraft Paper Cup",
    "slug": "360-ml-12-oz-single-wall-brown-kraft-paper-cup",
    "image": "360-ml-12-oz-single-wall-brown-kraft-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-brown-kraft-paper-cup"
  },
  {
    "sourceId": 5850,
    "name": "360 Ml (12 OZ) Single Wall Dark Magenta Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-dark-magenta-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-dark-magenta-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-dark-magenta-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5845,
    "name": "360 Ml (12 OZ) Single Wall Green Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-green-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-green-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-green-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5842,
    "name": "360 Ml (12 OZ) Single Wall Orange Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-orange-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-orange-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-orange-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5847,
    "name": "360 Ml (12 OZ) Single Wall Parrot Green Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-parrot-green-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-parrot-green-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-parrot-green-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5848,
    "name": "360 Ml (12 OZ) Single Wall Pink Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-pink-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-pink-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-pink-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5843,
    "name": "360 Ml (12 OZ) Single Wall Red Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-red-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-red-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-red-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5846,
    "name": "360 Ml (12 OZ) Single Wall Yellow Coloured Kraft White Paper Cup",
    "slug": "360-ml-12-oz-single-wall-yellow-coloured-kraft-white-paper-cup",
    "image": "360-ml-12-oz-single-wall-yellow-coloured-kraft-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Single Wall Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "single-wall-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/360-ml-12-oz-single-wall-yellow-coloured-kraft-white-paper-cup"
  },
  {
    "sourceId": 5737,
    "name": "38 X 51 CM Baking Paper For Multi Baking",
    "slug": "38-x-51-cm-baking-paper-for-multi-baking",
    "image": "38-x-51-cm-baking-paper-for-multi-baking.webp",
    "unit": "Kg",
    "sourceCategory": "Baking Paper Sheet",
    "sourceParentCategory": "BAKE OVEN PAPER",
    "sourceCategorySlug": "baking-paper-sheet",
    "sourceUrl": "https://www.gujaratshopee.com/product/38-x-51-cm-baking-paper-for-multi-baking"
  },
  {
    "sourceId": 5731,
    "name": "38 X 51 CM Brown Food Wrapping Grease Proof Paper (7 Kit Value)",
    "slug": "38-x-51-cm-brown-food-wrapping-grease-proof-paper-7-kit-value",
    "image": "38-x-51-cm-brown-food-wrapping-grease-proof-paper-7-kit-value.webp",
    "unit": "Kg",
    "sourceCategory": "Brown Food Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "brown-food-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/38-x-51-cm-brown-food-wrapping-grease-proof-paper-7-kit-value"
  },
  {
    "sourceId": 5732,
    "name": "38 X 51 CM White Food Wrapping Grease Proof Paper (7 Kit Value)",
    "slug": "38-x-51-cm-white-food-wrapping-grease-proof-paper-7-kit-value",
    "image": "38-x-51-cm-white-food-wrapping-grease-proof-paper-7-kit-value.webp",
    "unit": "Kg",
    "sourceCategory": "White Food Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "white-food-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/38-x-51-cm-white-food-wrapping-grease-proof-paper-7-kit-value"
  },
  {
    "sourceId": 5531,
    "name": "480 ML Aluminium Foil Laminated Paper Noodle Wok Box 16 Oz",
    "slug": "480-ml-aluminium-foil-laminated-paper-noodle-wok-box-16-oz",
    "image": "480-ml-aluminium-foil-laminated-paper-noodle-wok-box-16-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/480-ml-aluminium-foil-laminated-paper-noodle-wok-box-16-oz"
  },
  {
    "sourceId": 4895,
    "name": "480 ML Brown Kraft Paper Noodle Wok Box  16 Oz",
    "slug": "480-ml-brown-kraft-paper-noodle-wok-box-16-oz",
    "image": "480-ml-brown-kraft-paper-noodle-wok-box-16-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/480-ml-brown-kraft-paper-noodle-wok-box-16-oz"
  },
  {
    "sourceId": 5100,
    "name": "480 ML White Kraft Paper Noodle Wok Box 16 Oz",
    "slug": "480-ml-white-kraft-paper-noodle-wok-box-16-oz",
    "image": "480-ml-white-kraft-paper-noodle-wok-box-16-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/480-ml-white-kraft-paper-noodle-wok-box-16-oz"
  },
  {
    "sourceId": 4242,
    "name": "5 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "5-inch-brown-paper-pizza-box-3-ply",
    "image": "5-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/5-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4254,
    "name": "5 Inch White Paper Pizza Box 3 Ply",
    "slug": "5-inch-white-paper-pizza-box-3-ply",
    "image": "5-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/5-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 5244,
    "name": "50 ML White Paper Cup",
    "slug": "50-ml-white-paper-cup",
    "image": "50-ml-white-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Small Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "small-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/50-ml-white-paper-cup"
  },
  {
    "sourceId": 5971,
    "name": "50 X 75 CM Baking Paper For Multi Baking",
    "slug": "50-x-75-cm-baking-paper-for-multi-baking",
    "image": "50-x-75-cm-baking-paper-for-multi-baking.webp",
    "unit": "Kg",
    "sourceCategory": "Baking Paper Sheet",
    "sourceParentCategory": "BAKE OVEN PAPER",
    "sourceCategorySlug": "baking-paper-sheet",
    "sourceUrl": "https://www.gujaratshopee.com/product/50-x-75-cm-baking-paper-for-multi-baking"
  },
  {
    "sourceId": 5734,
    "name": "50 X 75 CM Brown Food Wrapping Grease Proof Paper (7 Kit Value)",
    "slug": "50-x-75-cm-brown-food-wrapping-grease-proof-paper-7-kit-value",
    "image": "50-x-75-cm-brown-food-wrapping-grease-proof-paper-7-kit-value.webp",
    "unit": "Kg",
    "sourceCategory": "Brown Food Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "brown-food-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/50-x-75-cm-brown-food-wrapping-grease-proof-paper-7-kit-value"
  },
  {
    "sourceId": 5733,
    "name": "50 X 75 CM White Food Wrapping Grease Proof Paper (7 Kit Value)",
    "slug": "50-x-75-cm-white-food-wrapping-grease-proof-paper-7-kit-value",
    "image": "50-x-75-cm-white-food-wrapping-grease-proof-paper-7-kit-value.webp",
    "unit": "Kg",
    "sourceCategory": "White Food Wrapping Paper",
    "sourceParentCategory": "FOOD WRAPPING PAPER",
    "sourceCategorySlug": "white-food-wrapping-paper",
    "sourceUrl": "https://www.gujaratshopee.com/product/50-x-75-cm-white-food-wrapping-grease-proof-paper-7-kit-value"
  },
  {
    "sourceId": 5526,
    "name": "500 ML Aluminium Foil Laminated Paper Food Container 16 Oz",
    "slug": "500-ml-aluminium-foil-laminated-paper-food-container-16-oz",
    "image": "500-ml-aluminium-foil-laminated-paper-food-container-16-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-aluminium-foil-laminated-paper-food-container-16-oz"
  },
  {
    "sourceId": 5550,
    "name": "500 ML Aluminium Foil Laminated Paper Meal Box 150 X 100 X 40 MM (Top X Bottom X Height)",
    "slug": "500-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height",
    "image": "500-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5712,
    "name": "500 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 150 X 100 X 40 MM (Top X Bottom X Height)",
    "slug": "500-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height",
    "image": "500-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3648,
    "name": "500 ML Aluminium Foil Laminated Paper Salad Bowl",
    "slug": "500-ml-aluminium-foil-laminated-paper-salad-bowl",
    "image": "500-ml-aluminium-foil-laminated-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-aluminium-foil-laminated-paper-salad-bowl"
  },
  {
    "sourceId": 3511,
    "name": "500 ML Brown Kraft Paper Meal Box 150 X 100 X 40 MM (Top X Bottom X Height)",
    "slug": "500-ml-brown-kraft-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height",
    "image": "500-ml-brown-kraft-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-brown-kraft-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3979,
    "name": "500 ML Brown Kraft Paper Meal Box With Transparent Window 150 X 100 X 40 MM (Top X Bottom X Height)",
    "slug": "500-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height",
    "image": "500-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5978,
    "name": "500 ML Brown Recycle Kraft Paper Food Container 16 Oz",
    "slug": "500-ml-brown-recycle-kraft-paper-food-container-16-oz",
    "image": "500-ml-brown-recycle-kraft-paper-food-container-16-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-brown-recycle-kraft-paper-food-container-16-oz"
  },
  {
    "sourceId": 5972,
    "name": "500 ML Brown Recycle Kraft Paper Salad Bowl",
    "slug": "500-ml-brown-recycle-kraft-paper-salad-bowl",
    "image": "500-ml-brown-recycle-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-brown-recycle-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 5402,
    "name": "500 ML Brown Virgin Kraft Paper Food Container 16 Oz",
    "slug": "500-ml-brown-virgin-kraft-paper-food-container-16-oz",
    "image": "500-ml-brown-virgin-kraft-paper-food-container-16-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-brown-virgin-kraft-paper-food-container-16-oz"
  },
  {
    "sourceId": 5287,
    "name": "500 ML Brown Virgin Kraft Paper Salad Bowl",
    "slug": "500-ml-brown-virgin-kraft-paper-salad-bowl",
    "image": "500-ml-brown-virgin-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-brown-virgin-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 3545,
    "name": "500 ML White Kraft Paper Meal Box 150 X 100 X 40 MM (Top X Bottom X Height)",
    "slug": "500-ml-white-kraft-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height",
    "image": "500-ml-white-kraft-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-white-kraft-paper-meal-box-150-x-100-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3980,
    "name": "500 ML White Kraft Paper Meal Box With Transparent Window 150 X 100 X 40 MM (Top X Bottom X Height)",
    "slug": "500-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height",
    "image": "500-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-40-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5291,
    "name": "500 ML White Kraft Paper Salad Bowl",
    "slug": "500-ml-white-kraft-paper-salad-bowl",
    "image": "500-ml-white-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-white-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 5407,
    "name": "500 ML White Paper Food Container 16 Oz",
    "slug": "500-ml-white-paper-food-container-16-oz",
    "image": "500-ml-white-paper-food-container-16-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/500-ml-white-paper-food-container-16-oz"
  },
  {
    "sourceId": 5869,
    "name": "550 ML  White Kraft Paper Meal Box 122 X 110 X 47 MM (Top X Bottom X Height)",
    "slug": "550-ml-white-kraft-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height",
    "image": "550-ml-white-kraft-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/550-ml-white-kraft-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5875,
    "name": "550 ML Aluminium Foil Laminated Paper Meal Box 122 X 110 X 47 MM (Top X Bottom X Height)",
    "slug": "550-ml-aluminium-foil-laminated-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height",
    "image": "550-ml-aluminium-foil-laminated-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/550-ml-aluminium-foil-laminated-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5872,
    "name": "550 ML Brown Kraft Paper Meal Box 122 X 110 X 47 MM (Top X Bottom X Height)",
    "slug": "550-ml-brown-kraft-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height",
    "image": "550-ml-brown-kraft-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/550-ml-brown-kraft-paper-meal-box-122-x-110-x-47-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5527,
    "name": "580 ML Aluminium Foil Laminated Paper Food Container 20 Oz",
    "slug": "580-ml-aluminium-foil-laminated-paper-food-container-20-oz",
    "image": "580-ml-aluminium-foil-laminated-paper-food-container-20-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/580-ml-aluminium-foil-laminated-paper-food-container-20-oz"
  },
  {
    "sourceId": 5979,
    "name": "580 ML Brown Recycle Kraft Paper Food Container 20 Oz",
    "slug": "580-ml-brown-recycle-kraft-paper-food-container-20-oz",
    "image": "580-ml-brown-recycle-kraft-paper-food-container-20-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/580-ml-brown-recycle-kraft-paper-food-container-20-oz"
  },
  {
    "sourceId": 5403,
    "name": "580 ML Brown Virgin Kraft Paper Food Container 20 Oz",
    "slug": "580-ml-brown-virgin-kraft-paper-food-container-20-oz",
    "image": "580-ml-brown-virgin-kraft-paper-food-container-20-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/580-ml-brown-virgin-kraft-paper-food-container-20-oz"
  },
  {
    "sourceId": 5408,
    "name": "580 ML White Paper Food Container 20 Oz",
    "slug": "580-ml-white-paper-food-container-20-oz",
    "image": "580-ml-white-paper-food-container-20-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/580-ml-white-paper-food-container-20-oz"
  },
  {
    "sourceId": 4330,
    "name": "6 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "6-inch-brown-paper-pizza-box-3-ply",
    "image": "6-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/6-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4331,
    "name": "6 Inch White Paper Pizza Box 3 Ply",
    "slug": "6-inch-white-paper-pizza-box-3-ply",
    "image": "6-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/6-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 5551,
    "name": "600 ML Aluminium Foil Laminated Paper Meal Box 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5713,
    "name": "600 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5588,
    "name": "600 ML Aluminium Foil Laminated Paper Two Compartment Food Box 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-aluminium-foil-laminated-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-aluminium-foil-laminated-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-aluminium-foil-laminated-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5358,
    "name": "600 ML Brown Kraft Paper Meal Box 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-brown-kraft-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-brown-kraft-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-brown-kraft-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5360,
    "name": "600 ML Brown Kraft Paper Meal Box With Transparent Window 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5378,
    "name": "600 ML Brown Kraft Paper Two Compartment Food Box 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-brown-kraft-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-brown-kraft-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-brown-kraft-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5359,
    "name": "600 ML White Kraft Paper Meal Box 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-white-kraft-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-white-kraft-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-white-kraft-paper-meal-box-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5361,
    "name": "600 ML White Kraft Paper Meal Box With Transparent Window 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5441,
    "name": "600 ML White Kraft Paper Two Compartment Food Box 150 X 100 X 55 MM (Top X Bottom X Height)",
    "slug": "600-ml-white-kraft-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height",
    "image": "600-ml-white-kraft-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/600-ml-white-kraft-paper-two-compartment-food-box-150-x-100-x-55-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5943,
    "name": "7 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "7-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "7-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/7-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4241,
    "name": "7 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "7-inch-brown-paper-pizza-box-3-ply",
    "image": "7-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/7-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4268,
    "name": "7 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "7-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "7-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/7-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5944,
    "name": "7 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "7-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "7-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/7-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4255,
    "name": "7 Inch White Paper Pizza Box 3 Ply",
    "slug": "7-inch-white-paper-pizza-box-3-ply",
    "image": "7-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/7-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4279,
    "name": "7 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "7-inch-white-paper-premium-pizza-box-3-ply",
    "image": "7-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/7-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5552,
    "name": "700 ML Aluminium Foil Laminated Paper Meal Box 170 X 115 X 45 MM (Top X Bottom X Height)",
    "slug": "700-ml-aluminium-foil-laminated-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height",
    "image": "700-ml-aluminium-foil-laminated-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/700-ml-aluminium-foil-laminated-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5714,
    "name": "700 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 170 X 115 X 45 MM (Top X Bottom X Height)",
    "slug": "700-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height",
    "image": "700-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/700-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3512,
    "name": "700 ML Brown Kraft Paper Meal Box 170 X 115 X 45 MM (Top X Bottom X Height)",
    "slug": "700-ml-brown-kraft-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height",
    "image": "700-ml-brown-kraft-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/700-ml-brown-kraft-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3982,
    "name": "700 ML Brown Kraft Paper Meal Box With Transparent Window 170 X 115 X 45 MM (Top X Bottom X Height)",
    "slug": "700-ml-brown-kraft-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height",
    "image": "700-ml-brown-kraft-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/700-ml-brown-kraft-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3546,
    "name": "700 ML White Kraft Paper Meal Box 170 X 115 X 45 MM (Top X Bottom X Height)",
    "slug": "700-ml-white-kraft-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height",
    "image": "700-ml-white-kraft-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/700-ml-white-kraft-paper-meal-box-170-x-115-x-45-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3981,
    "name": "700 ML White Kraft Paper Meal Box With Transparent Window 170 X 115 X 45 MM (Top X Bottom X Height)",
    "slug": "700-ml-white-kraft-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height",
    "image": "700-ml-white-kraft-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/700-ml-white-kraft-paper-meal-box-with-transparent-window-170-x-115-x-45-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3111,
    "name": "750 ML Aluminium Foil Laminated Paper Salad Bowl",
    "slug": "750-ml-aluminium-foil-laminated-paper-salad-bowl",
    "image": "750-ml-aluminium-foil-laminated-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/750-ml-aluminium-foil-laminated-paper-salad-bowl"
  },
  {
    "sourceId": 5974,
    "name": "750 ML Brown Recycle Kraft Paper Salad Bowl",
    "slug": "750-ml-brown-recycle-kraft-paper-salad-bowl",
    "image": "750-ml-brown-recycle-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/750-ml-brown-recycle-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 5290,
    "name": "750 ML Brown Virgin Kraft Paper Salad Bowl",
    "slug": "750-ml-brown-virgin-kraft-paper-salad-bowl",
    "image": "750-ml-brown-virgin-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/750-ml-brown-virgin-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 5292,
    "name": "750 ML White Kraft Paper Salad Bowl",
    "slug": "750-ml-white-kraft-paper-salad-bowl",
    "image": "750-ml-white-kraft-paper-salad-bowl.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Salad Bowl",
    "sourceParentCategory": "PAPER BOWL - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-salad-bowl",
    "sourceUrl": "https://www.gujaratshopee.com/product/750-ml-white-kraft-paper-salad-bowl"
  },
  {
    "sourceId": 5532,
    "name": "770 ML Aluminium Foil Laminated Paper Noodle Wok Box 26 Oz",
    "slug": "770-ml-aluminium-foil-laminated-paper-noodle-wok-box-26-oz",
    "image": "770-ml-aluminium-foil-laminated-paper-noodle-wok-box-26-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/770-ml-aluminium-foil-laminated-paper-noodle-wok-box-26-oz"
  },
  {
    "sourceId": 5098,
    "name": "770 ML Brown Kraft Paper Noodle Wok Box 26 Oz",
    "slug": "770-ml-brown-kraft-paper-noodle-wok-box-26-oz",
    "image": "770-ml-brown-kraft-paper-noodle-wok-box-26-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/770-ml-brown-kraft-paper-noodle-wok-box-26-oz"
  },
  {
    "sourceId": 5101,
    "name": "770 ML White Kraft Paper Noodle Wok Box 26 Oz",
    "slug": "770-ml-white-kraft-paper-noodle-wok-box-26-oz",
    "image": "770-ml-white-kraft-paper-noodle-wok-box-26-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/770-ml-white-kraft-paper-noodle-wok-box-26-oz"
  },
  {
    "sourceId": 5945,
    "name": "8 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "8-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "8-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/8-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4243,
    "name": "8 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "8-inch-brown-paper-pizza-box-3-ply",
    "image": "8-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/8-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4269,
    "name": "8 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "8-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "8-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/8-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5958,
    "name": "8 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "8-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "8-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/8-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4256,
    "name": "8 Inch White Paper Pizza Box 3 Ply",
    "slug": "8-inch-white-paper-pizza-box-3-ply",
    "image": "8-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/8-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4280,
    "name": "8 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "8-inch-white-paper-premium-pizza-box-3-ply",
    "image": "8-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/8-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 1843,
    "name": "80 MM Lockable Sipper Lid For 8 Oz (250 ml) Paper Cup",
    "slug": "80-mm-lockable-sipper-lid-for-8-oz-250-ml-paper-cup",
    "image": "80-mm-lockable-sipper-lid-for-8-oz-250-ml-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Disposable Sipper Lid",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "disposable-sipper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/80-mm-lockable-sipper-lid-for-8-oz-250-ml-paper-cup"
  },
  {
    "sourceId": 5942,
    "name": "80 MM Sipper Lid For 8 Oz (250 ml) Paper Cup",
    "slug": "80-mm-sipper-lid-for-8-oz-250-ml-paper-cup",
    "image": "80-mm-sipper-lid-for-8-oz-250-ml-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Disposable Sipper Lid",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "disposable-sipper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/80-mm-sipper-lid-for-8-oz-250-ml-paper-cup"
  },
  {
    "sourceId": 5553,
    "name": "800 ML Aluminium Foil Laminated Paper Meal Box 129 X 109 X 65 MM (Top X Bottom X Height)",
    "slug": "800-ml-aluminium-foil-laminated-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height",
    "image": "800-ml-aluminium-foil-laminated-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/800-ml-aluminium-foil-laminated-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5715,
    "name": "800 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 129 X 109 X 65 MM (Top X Bottom X Height)",
    "slug": "800-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height",
    "image": "800-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/800-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5328,
    "name": "800 ML Brown Kraft Paper Meal Box 129 X 109 X 65 MM (Top X Bottom X Height)",
    "slug": "800-ml-brown-kraft-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height",
    "image": "800-ml-brown-kraft-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/800-ml-brown-kraft-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5331,
    "name": "800 ML Brown Kraft Paper Meal Box With Transparent Window 129 X 109 X 65 MM (Top X Bottom X Height)",
    "slug": "800-ml-brown-kraft-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height",
    "image": "800-ml-brown-kraft-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/800-ml-brown-kraft-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5329,
    "name": "800 ML White Kraft Paper Meal Box 129 X 109 X 65 MM (Top X Bottom X Height)",
    "slug": "800-ml-white-kraft-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height",
    "image": "800-ml-white-kraft-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/800-ml-white-kraft-paper-meal-box-129-x-109-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5330,
    "name": "800 ML White Kraft Paper Meal Box With Transparent Window 129 X 109 X 65 MM (Top X Bottom X Height)",
    "slug": "800-ml-white-kraft-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height",
    "image": "800-ml-white-kraft-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/800-ml-white-kraft-paper-meal-box-with-transparent-window-129-x-109-x-65-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5554,
    "name": "825 ML Aluminium Foil Laminated Paper Meal Box 175 X 135 X 48 MM (Top X Bottom X Height)",
    "slug": "825-ml-aluminium-foil-laminated-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height",
    "image": "825-ml-aluminium-foil-laminated-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/825-ml-aluminium-foil-laminated-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5716,
    "name": "825 ML Aluminium Foil Laminated Paper Meal Box With Transparent Window 175 X 135 X 48 MM (Top X Bottom X Height)",
    "slug": "825-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height",
    "image": "825-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/825-ml-aluminium-foil-laminated-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3326,
    "name": "825 ML Brown Kraft Paper Meal Box 175 X 135 X 48 MM (Top X Bottom X Height)",
    "slug": "825-ml-brown-kraft-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height",
    "image": "825-ml-brown-kraft-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/825-ml-brown-kraft-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3329,
    "name": "825 ML Brown Kraft Paper Meal Box With Transparent Window 175 X 135 X 48 MM (Top X Bottom X Height)",
    "slug": "825-ml-brown-kraft-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height",
    "image": "825-ml-brown-kraft-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/825-ml-brown-kraft-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3547,
    "name": "825 ML White Kraft Paper Meal Box 175 X 135 X 48 MM (Top X Bottom X Height)",
    "slug": "825-ml-white-kraft-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height",
    "image": "825-ml-white-kraft-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/825-ml-white-kraft-paper-meal-box-175-x-135-x-48-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3551,
    "name": "825 ML White Kraft Paper Meal Box With Transparent Window 175 X 135 X 48 MM (Top X Bottom X Height)",
    "slug": "825-ml-white-kraft-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height",
    "image": "825-ml-white-kraft-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/825-ml-white-kraft-paper-meal-box-with-transparent-window-175-x-135-x-48-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5946,
    "name": "9 Inch Brown Paper Octagonal Pizza Box 3 Ply",
    "slug": "9-inch-brown-paper-octagonal-pizza-box-3-ply",
    "image": "9-inch-brown-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/9-inch-brown-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4244,
    "name": "9 Inch Brown Paper Pizza Box 3 Ply",
    "slug": "9-inch-brown-paper-pizza-box-3-ply",
    "image": "9-inch-brown-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/9-inch-brown-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4270,
    "name": "9 Inch Brown Paper Premium Pizza Box 3 Ply",
    "slug": "9-inch-brown-paper-premium-pizza-box-3-ply",
    "image": "9-inch-brown-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "Brown Kraft Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "brown-kraft-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/9-inch-brown-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 5959,
    "name": "9 Inch White Paper Octagonal Pizza Box 3 Ply",
    "slug": "9-inch-white-paper-octagonal-pizza-box-3-ply",
    "image": "9-inch-white-paper-octagonal-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Octagonal Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-octagonal-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/9-inch-white-paper-octagonal-pizza-box-3-ply"
  },
  {
    "sourceId": 4257,
    "name": "9 Inch White Paper Pizza Box 3 Ply",
    "slug": "9-inch-white-paper-pizza-box-3-ply",
    "image": "9-inch-white-paper-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/9-inch-white-paper-pizza-box-3-ply"
  },
  {
    "sourceId": 4281,
    "name": "9 Inch White Paper Premium Pizza Box 3 Ply",
    "slug": "9-inch-white-paper-premium-pizza-box-3-ply",
    "image": "9-inch-white-paper-premium-pizza-box-3-ply.webp",
    "unit": "Piece",
    "sourceCategory": "White Top Paper Premium Pizza Box",
    "sourceParentCategory": "PAPER PIZZA BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-top-paper-premium-pizza-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/9-inch-white-paper-premium-pizza-box-3-ply"
  },
  {
    "sourceId": 2709,
    "name": "90 MM Lockable Sipper Lid For 12 Oz (360 ml) Paper Cup",
    "slug": "90-mm-lockable-sipper-lid-for-12-oz-360-ml-paper-cup",
    "image": "90-mm-lockable-sipper-lid-for-12-oz-360-ml-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Disposable Sipper Lid",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "disposable-sipper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/90-mm-lockable-sipper-lid-for-12-oz-360-ml-paper-cup"
  },
  {
    "sourceId": 5941,
    "name": "90 MM Sipper Lid For 12 Oz (360 ml) Paper Cup",
    "slug": "90-mm-sipper-lid-for-12-oz-360-ml-paper-cup",
    "image": "90-mm-sipper-lid-for-12-oz-360-ml-paper-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Disposable Sipper Lid",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "disposable-sipper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/90-mm-sipper-lid-for-12-oz-360-ml-paper-cup"
  },
  {
    "sourceId": 5589,
    "name": "900 ML Aluminium Foil Laminated Paper Two Compartment Food Box 150 X 100 X 75 MM (Top X Bottom X Height)",
    "slug": "900-ml-aluminium-foil-laminated-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height",
    "image": "900-ml-aluminium-foil-laminated-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/900-ml-aluminium-foil-laminated-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5380,
    "name": "900 ML Brown Kraft Paper Two Compartment Food Box 150 X 100 X 75 MM (Top X Bottom X Height)",
    "slug": "900-ml-brown-kraft-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height",
    "image": "900-ml-brown-kraft-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/900-ml-brown-kraft-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5442,
    "name": "900 ML White Kraft Paper Two Compartment Food Box 150 X 100 X 75 MM (Top X Bottom X Height)",
    "slug": "900-ml-white-kraft-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height",
    "image": "900-ml-white-kraft-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Food Box With Compartment",
    "sourceParentCategory": "PAPER FOOD BOX WITH COMPARTMENT - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-food-box-with-compartment",
    "sourceUrl": "https://www.gujaratshopee.com/product/900-ml-white-kraft-paper-two-compartment-food-box-150-x-100-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5555,
    "name": "950 ML Aluminium Foil Laminated Paper Meal Box 150 X 100 X 75 MM (Top X Bottom X Height)",
    "slug": "950-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height",
    "image": "950-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/950-ml-aluminium-foil-laminated-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5533,
    "name": "950 ML Aluminium Foil Laminated Paper Noodle Wok Box 32 Oz",
    "slug": "950-ml-aluminium-foil-laminated-paper-noodle-wok-box-32-oz",
    "image": "950-ml-aluminium-foil-laminated-paper-noodle-wok-box-32-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/950-ml-aluminium-foil-laminated-paper-noodle-wok-box-32-oz"
  },
  {
    "sourceId": 5362,
    "name": "950 ML Brown Kraft Paper Meal Box 150 X 100 X 75 MM (Top X Bottom X Height)",
    "slug": "950-ml-brown-kraft-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height",
    "image": "950-ml-brown-kraft-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/950-ml-brown-kraft-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5364,
    "name": "950 ML Brown Kraft Paper Meal Box With Transparent Window 150 X 100 X 75 MM (Top X Bottom X Height)",
    "slug": "950-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-75-mm-top-x-bottom-x-height",
    "image": "950-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/950-ml-brown-kraft-paper-meal-box-with-transparent-window-150-x-100-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5221,
    "name": "950 ML Brown Kraft Paper Noodle Wok Box 32 Oz",
    "slug": "950-ml-brown-kraft-paper-noodle-wok-box-32-oz",
    "image": "950-ml-brown-kraft-paper-noodle-wok-box-32-oz.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/950-ml-brown-kraft-paper-noodle-wok-box-32-oz"
  },
  {
    "sourceId": 5363,
    "name": "950 ML White Kraft Paper Meal Box 150 X 100 X 75 MM (Top X Bottom X Height)",
    "slug": "950-ml-white-kraft-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height",
    "image": "950-ml-white-kraft-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box",
    "sourceParentCategory": "PAPER MEAL BOX  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/950-ml-white-kraft-paper-meal-box-150-x-100-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5365,
    "name": "950 ML White Kraft Paper Meal Box With Transparent Window 150 X 100 X 75 MM (Top X Bottom X Height)",
    "slug": "950-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-75-mm-top-x-bottom-x-height",
    "image": "950-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-75-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Meal Box With Transparent Window",
    "sourceParentCategory": "PAPER MEAL BOX WITH TRANSPARENT WINDOW - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-meal-box-with-transparent-window",
    "sourceUrl": "https://www.gujaratshopee.com/product/950-ml-white-kraft-paper-meal-box-with-transparent-window-150-x-100-x-75-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5222,
    "name": "950 ML White Kraft Paper Noodle Wok Box 32 Oz",
    "slug": "950-ml-white-kraft-paper-noodle-wok-box-32-oz",
    "image": "950-ml-white-kraft-paper-noodle-wok-box-32-oz.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Noodle Wok Box",
    "sourceParentCategory": "PAPER NOODLE WOK BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-noodle-wok-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/950-ml-white-kraft-paper-noodle-wok-box-32-oz"
  },
  {
    "sourceId": 5528,
    "name": "98 MM Paper Lid for Aluminium Foil Laminated Paper Food Container (226 ML / 250 ML / 350 ML / 500 ML / 580 ML)",
    "slug": "98-mm-paper-lid-for-aluminium-foil-laminated-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml",
    "image": "98-mm-paper-lid-for-aluminium-foil-laminated-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml.webp",
    "unit": "Piece",
    "sourceCategory": "Aluminium Foil Laminated Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "aluminium-foil-laminated-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/98-mm-paper-lid-for-aluminium-foil-laminated-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml"
  },
  {
    "sourceId": 5980,
    "name": "98 MM Paper Lid for Recycle Kraft Paper Food Container (226 ML / 250 ML / 350 ML / 500 ML / 580 ML)",
    "slug": "98-mm-paper-lid-for-recycle-kraft-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml",
    "image": "98-mm-paper-lid-for-recycle-kraft-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/98-mm-paper-lid-for-recycle-kraft-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml"
  },
  {
    "sourceId": 5409,
    "name": "98 MM Paper Lid for Virgin Kraft Paper Food Container (226 ML / 250 ML / 350 ML / 500 ML / 580 ML)",
    "slug": "98-mm-paper-lid-for-virgin-kraft-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml",
    "image": "98-mm-paper-lid-for-virgin-kraft-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml.webp",
    "unit": "Piece",
    "sourceCategory": "Kraft Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "kraft-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/98-mm-paper-lid-for-virgin-kraft-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml"
  },
  {
    "sourceId": 5410,
    "name": "98 MM Paper Lid for White Paper Food Container (226 ML / 250 ML / 350 ML / 500 ML / 580 ML)",
    "slug": "98-mm-paper-lid-for-white-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml",
    "image": "98-mm-paper-lid-for-white-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml.webp",
    "unit": "Piece",
    "sourceCategory": "White Paper Container With Paper Lid",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "white-paper-container-with-paper-lid",
    "sourceUrl": "https://www.gujaratshopee.com/product/98-mm-paper-lid-for-white-paper-food-container-226-ml-250-ml-350-ml-500-ml-580-ml"
  },
  {
    "sourceId": 5529,
    "name": "98 MM PP Lid for Paper Container ( 226 ML / 250  ML / 350 ML / 500 ML / 580 ML )",
    "slug": "98-mm-pp-lid-for-paper-container-226-ml-250-ml-350-ml-500-ml-580-ml-55",
    "image": "98-mm-pp-lid-for-paper-container-226-ml-250-ml-350-ml-500-ml-580-ml-55.webp",
    "unit": "Piece",
    "sourceCategory": "PP Lid For Paper Food Container",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "pp-lid-for-paper-food-container",
    "sourceUrl": "https://www.gujaratshopee.com/product/98-mm-pp-lid-for-paper-container-226-ml-250-ml-350-ml-500-ml-580-ml-55"
  },
  {
    "sourceId": 3344,
    "name": "Brown Kraft  Paper One Cup Holder",
    "slug": "brown-kraft-paper-one-cup-holder",
    "image": "brown-kraft-paper-one-cup-holder.webp",
    "unit": "Piece",
    "sourceCategory": "1 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "1-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-one-cup-holder"
  },
  {
    "sourceId": 3299,
    "name": "Brown Kraft  Paper Two  Container Holder Tray",
    "slug": "brown-kraft-paper-two-container-holder-tray",
    "image": "brown-kraft-paper-two-container-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Container Holder Tray",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-container-holder-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-two-container-holder-tray"
  },
  {
    "sourceId": 3773,
    "name": "Brown Kraft Paper Clamshell Food Box 3.5 x 3.5 x 2 Inch",
    "slug": "brown-kraft-paper-clamshell-food-box-35-x-35-x-2-inch",
    "image": "brown-kraft-paper-clamshell-food-box-35-x-35-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Clamshell Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "clamshell-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-clamshell-food-box-35-x-35-x-2-inch"
  },
  {
    "sourceId": 5900,
    "name": "Brown Kraft Paper Clamshell Food Box 4 x 4 x 3.15 Inch",
    "slug": "brown-kraft-paper-clamshell-food-box-4-x-4-x-315-inch",
    "image": "brown-kraft-paper-clamshell-food-box-4-x-4-x-315-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Clamshell Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "clamshell-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-clamshell-food-box-4-x-4-x-315-inch"
  },
  {
    "sourceId": 5902,
    "name": "Brown Kraft Paper Clamshell Food Box 7.5 x 4.25 x 2.75 Inch",
    "slug": "brown-kraft-paper-clamshell-food-box-75-x-425-x-275-inch",
    "image": "brown-kraft-paper-clamshell-food-box-75-x-425-x-275-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Clamshell Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "clamshell-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-clamshell-food-box-75-x-425-x-275-inch"
  },
  {
    "sourceId": 5904,
    "name": "Brown Kraft Paper Clamshell Food Box 9 x 9 x 2.5 Inch",
    "slug": "brown-kraft-paper-clamshell-food-box-9-x-9-x-25-inch",
    "image": "brown-kraft-paper-clamshell-food-box-9-x-9-x-25-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Clamshell Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "clamshell-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-clamshell-food-box-9-x-9-x-25-inch"
  },
  {
    "sourceId": 5294,
    "name": "Brown Kraft Paper Cone French Fries Box With Dip Attachment 2.75 x 2.75 x 6.5 Inch",
    "slug": "brown-kraft-paper-cone-french-fries-box-with-dip-attachment-275-x-275-x-65-inch",
    "image": "brown-kraft-paper-cone-french-fries-box-with-dip-attachment-275-x-275-x-65-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Cone Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "cone-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-cone-french-fries-box-with-dip-attachment-275-x-275-x-65-inch"
  },
  {
    "sourceId": 3908,
    "name": "Brown Kraft Paper Cone French Fries Box With Dip Attachment 3.25 x 3.25 x 7.5 Inch",
    "slug": "brown-kraft-paper-cone-french-fries-box-with-dip-attachment-325-x-325-x-75-inch",
    "image": "brown-kraft-paper-cone-french-fries-box-with-dip-attachment-325-x-325-x-75-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Cone Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "cone-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-cone-french-fries-box-with-dip-attachment-325-x-325-x-75-inch"
  },
  {
    "sourceId": 3909,
    "name": "Brown Kraft Paper Cone French Fries Box With Dip Attachment 3.5 x 3.5 x 8.5 Inch",
    "slug": "brown-kraft-paper-cone-french-fries-box-with-dip-attachment-35-x-35-x-85-inch",
    "image": "brown-kraft-paper-cone-french-fries-box-with-dip-attachment-35-x-35-x-85-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Cone Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "cone-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-cone-french-fries-box-with-dip-attachment-35-x-35-x-85-inch"
  },
  {
    "sourceId": 4720,
    "name": "Brown Kraft Paper Dosa Box 13 x 3 x 1.75 Inch",
    "slug": "brown-kraft-paper-dosa-box-13-x-3-x-175-inch",
    "image": "brown-kraft-paper-dosa-box-13-x-3-x-175-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Dosa Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-dosa-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-dosa-box-13-x-3-x-175-inch"
  },
  {
    "sourceId": 5703,
    "name": "Brown Kraft Paper Dosa Box 14.5 x 3.5 x 2.5 Inch",
    "slug": "brown-kraft-paper-dosa-box-145-x-35-x-25-inch",
    "image": "brown-kraft-paper-dosa-box-145-x-35-x-25-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Dosa Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-dosa-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-dosa-box-145-x-35-x-25-inch"
  },
  {
    "sourceId": 1295,
    "name": "Brown Kraft Paper Four Cup Holder Tray",
    "slug": "brown-kraft-paper-four-cup-holder-tray",
    "image": "brown-kraft-paper-four-cup-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "4 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "4-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-four-cup-holder-tray"
  },
  {
    "sourceId": 3297,
    "name": "Brown Kraft Paper Four Cup Holder With Handle",
    "slug": "brown-kraft-paper-four-cup-holder-with-handle",
    "image": "brown-kraft-paper-four-cup-holder-with-handle.webp",
    "unit": "Piece",
    "sourceCategory": "4 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "4-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-four-cup-holder-with-handle"
  },
  {
    "sourceId": 3295,
    "name": "Brown Kraft Paper One Cup Holder Tray",
    "slug": "brown-kraft-paper-one-cup-holder-tray",
    "image": "brown-kraft-paper-one-cup-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "1 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "1-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-one-cup-holder-tray"
  },
  {
    "sourceId": 4324,
    "name": "Brown Kraft Paper Pillow Food Box 5 x 3 x 0.75 Inch",
    "slug": "brown-kraft-paper-pillow-food-box-5-x-3-x-075-inch",
    "image": "brown-kraft-paper-pillow-food-box-5-x-3-x-075-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-pillow-food-box-5-x-3-x-075-inch"
  },
  {
    "sourceId": 4325,
    "name": "Brown Kraft Paper Pillow Food Box 7 x 4.5 x 1.25 Inch",
    "slug": "brown-kraft-paper-pillow-food-box-7-x-45-x-125-inch",
    "image": "brown-kraft-paper-pillow-food-box-7-x-45-x-125-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-pillow-food-box-7-x-45-x-125-inch"
  },
  {
    "sourceId": 4326,
    "name": "Brown Kraft Paper Pillow Food Box 9 x 3 x 1.5 Inch",
    "slug": "brown-kraft-paper-pillow-food-box-9-x-3-x-15-inch",
    "image": "brown-kraft-paper-pillow-food-box-9-x-3-x-15-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-pillow-food-box-9-x-3-x-15-inch"
  },
  {
    "sourceId": 4321,
    "name": "Brown Kraft Paper Pillow Food Box With Window 5 x 3 x 0.75 Inch",
    "slug": "brown-kraft-paper-pillow-food-box-with-window-5-x-3-x-075-inch",
    "image": "brown-kraft-paper-pillow-food-box-with-window-5-x-3-x-075-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-pillow-food-box-with-window-5-x-3-x-075-inch"
  },
  {
    "sourceId": 4322,
    "name": "Brown Kraft Paper Pillow Food Box With Window 7 x 4.5 x 1.25 Inch",
    "slug": "brown-kraft-paper-pillow-food-box-with-window-7-x-45-x-125-inch",
    "image": "brown-kraft-paper-pillow-food-box-with-window-7-x-45-x-125-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-pillow-food-box-with-window-7-x-45-x-125-inch"
  },
  {
    "sourceId": 4323,
    "name": "Brown Kraft Paper Pillow Food Box With Window 9 x 3 x 1.5 Inch",
    "slug": "brown-kraft-paper-pillow-food-box-with-window-9-x-3-x-15-inch",
    "image": "brown-kraft-paper-pillow-food-box-with-window-9-x-3-x-15-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-pillow-food-box-with-window-9-x-3-x-15-inch"
  },
  {
    "sourceId": 375,
    "name": "Brown Kraft Paper Pocket French Fries Box 4 x 3 x 2 Inch",
    "slug": "brown-kraft-paper-pocket-french-fries-box-4-x-3-x-2-inch",
    "image": "brown-kraft-paper-pocket-french-fries-box-4-x-3-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pocket Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "pocket-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-pocket-french-fries-box-4-x-3-x-2-inch"
  },
  {
    "sourceId": 3320,
    "name": "Brown Kraft Paper Pocket French Fries Box 5 x 3 x 2 Inch",
    "slug": "brown-kraft-paper-pocket-french-fries-box-5-x-3-x-2-inch",
    "image": "brown-kraft-paper-pocket-french-fries-box-5-x-3-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pocket Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "pocket-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-pocket-french-fries-box-5-x-3-x-2-inch"
  },
  {
    "sourceId": 4890,
    "name": "Brown Kraft Paper Rectangle French fries Box 6.25 x 4 x 1.25 Inch",
    "slug": "brown-kraft-paper-rectangle-french-fries-box-625-x-4-x-125-inch",
    "image": "brown-kraft-paper-rectangle-french-fries-box-625-x-4-x-125-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Rectangle Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "rectangle-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-rectangle-french-fries-box-625-x-4-x-125-inch"
  },
  {
    "sourceId": 5694,
    "name": "Brown Kraft Paper Square Popcorn Box 100 x 70 x 160 MM (Top X Bottom X Height)",
    "slug": "brown-kraft-paper-square-popcorn-box-100-x-70-x-160-mm-top-x-bottom-x-height",
    "image": "brown-kraft-paper-square-popcorn-box-100-x-70-x-160-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-square-popcorn-box-100-x-70-x-160-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5693,
    "name": "Brown Kraft Paper Square Popcorn Box 120 x 80 x 180 MM (Top X Bottom X Height)",
    "slug": "brown-kraft-paper-square-popcorn-box-120-x-80-x-180-mm-top-x-bottom-x-height",
    "image": "brown-kraft-paper-square-popcorn-box-120-x-80-x-180-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-square-popcorn-box-120-x-80-x-180-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3698,
    "name": "Brown Kraft Paper Square Popcorn Box 130 x 55 x 195 MM (Top X Bottom X Height)",
    "slug": "brown-kraft-paper-square-popcorn-box-130-x-55-x-195-mm-top-x-bottom-x-height",
    "image": "brown-kraft-paper-square-popcorn-box-130-x-55-x-195-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-square-popcorn-box-130-x-55-x-195-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5697,
    "name": "Brown Kraft Paper Square Popcorn Box 70 x 50 x 100 MM (Top X Bottom X Height)",
    "slug": "brown-kraft-paper-square-popcorn-box-70-x-50-x-100-mm-top-x-bottom-x-height",
    "image": "brown-kraft-paper-square-popcorn-box-70-x-50-x-100-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-square-popcorn-box-70-x-50-x-100-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5696,
    "name": "Brown Kraft Paper Square Popcorn Box 80 x 60 x 120 MM (Top X Bottom X Height)",
    "slug": "brown-kraft-paper-square-popcorn-box-80-x-60-x-120-mm-top-x-bottom-x-height",
    "image": "brown-kraft-paper-square-popcorn-box-80-x-60-x-120-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-square-popcorn-box-80-x-60-x-120-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5695,
    "name": "Brown Kraft Paper Square Popcorn Box 90 x 65 x 140 MM (Top X Bottom X Height)",
    "slug": "brown-kraft-paper-square-popcorn-box-90-x-65-x-140-mm-top-x-bottom-x-height",
    "image": "brown-kraft-paper-square-popcorn-box-90-x-65-x-140-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-square-popcorn-box-90-x-65-x-140-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5262,
    "name": "Brown Kraft Paper Sushi Box 11 x 2 x 2 Inch",
    "slug": "brown-kraft-paper-sushi-box-11-x-2-x-2-inch",
    "image": "brown-kraft-paper-sushi-box-11-x-2-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-sushi-box-11-x-2-x-2-inch"
  },
  {
    "sourceId": 5390,
    "name": "Brown Kraft Paper Sushi Box 7 x 2.25 x 2.25 Inch",
    "slug": "brown-kraft-paper-sushi-box-7-x-225-x-225-inch",
    "image": "brown-kraft-paper-sushi-box-7-x-225-x-225-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-sushi-box-7-x-225-x-225-inch"
  },
  {
    "sourceId": 5391,
    "name": "Brown Kraft Paper Sushi Box 8.50 x 2.25 x 2.25 Inch",
    "slug": "brown-kraft-paper-sushi-box-850-x-225-x-225-inch",
    "image": "brown-kraft-paper-sushi-box-850-x-225-x-225-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-sushi-box-850-x-225-x-225-inch"
  },
  {
    "sourceId": 5709,
    "name": "Brown Kraft Paper Sushi Box With Window 11 x 2 x 2 Inch",
    "slug": "brown-kraft-paper-sushi-box-with-window-11-x-2-x-2-inch",
    "image": "brown-kraft-paper-sushi-box-with-window-11-x-2-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-sushi-box-with-window-11-x-2-x-2-inch"
  },
  {
    "sourceId": 5705,
    "name": "Brown Kraft Paper Sushi Box With Window 7 x 2.25 x 2.25 Inch",
    "slug": "brown-kraft-paper-sushi-box-with-window-7-x-225-x-225-inch",
    "image": "brown-kraft-paper-sushi-box-with-window-7-x-225-x-225-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-sushi-box-with-window-7-x-225-x-225-inch"
  },
  {
    "sourceId": 5706,
    "name": "Brown Kraft Paper Sushi Box With Window 8.50 x 2.25 x 2.25 Inch",
    "slug": "brown-kraft-paper-sushi-box-with-window-850-x-225-x-225-inch",
    "image": "brown-kraft-paper-sushi-box-with-window-850-x-225-x-225-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-sushi-box-with-window-850-x-225-x-225-inch"
  },
  {
    "sourceId": 5395,
    "name": "Brown Kraft Paper Sushi Tray 8.50 x 2.25 x 1.50 Inch",
    "slug": "brown-kraft-paper-sushi-tray-850-x-225-x-150-inch",
    "image": "brown-kraft-paper-sushi-tray-850-x-225-x-150-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-sushi-tray-850-x-225-x-150-inch"
  },
  {
    "sourceId": 3298,
    "name": "Brown Kraft Paper Three Cup Holder",
    "slug": "brown-kraft-paper-three-cup-holder",
    "image": "brown-kraft-paper-three-cup-holder.webp",
    "unit": "Piece",
    "sourceCategory": "3 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "3-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-three-cup-holder"
  },
  {
    "sourceId": 1293,
    "name": "Brown Kraft Paper Two  Cup Holder",
    "slug": "brown-kraft-paper-two-cup-holder",
    "image": "brown-kraft-paper-two-cup-holder.webp",
    "unit": "Piece",
    "sourceCategory": "2 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "2-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-two-cup-holder"
  },
  {
    "sourceId": 3293,
    "name": "Brown Kraft Paper Two Cup Holder",
    "slug": "brown-kraft-paper-two-cup-holder-11",
    "image": "brown-kraft-paper-two-cup-holder-11.webp",
    "unit": "Piece",
    "sourceCategory": "2 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "2-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-two-cup-holder-11"
  },
  {
    "sourceId": 1294,
    "name": "Brown Kraft Paper Two Cup Holder Tray",
    "slug": "brown-kraft-paper-two-cup-holder-tray",
    "image": "brown-kraft-paper-two-cup-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "2 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "2-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-two-cup-holder-tray"
  },
  {
    "sourceId": 3296,
    "name": "Brown Kraft Paper Two Cup Holder With Handle",
    "slug": "brown-kraft-paper-two-cup-holder-with-handle",
    "image": "brown-kraft-paper-two-cup-holder-with-handle.webp",
    "unit": "Piece",
    "sourceCategory": "2 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "2-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-kraft-paper-two-cup-holder-with-handle"
  },
  {
    "sourceId": 5609,
    "name": "Brown Virgin Kraft Paper Food Tray 10 OZ - 6.50 X 4.75 X 1.75 Inch - Rectangle",
    "slug": "brown-virgin-kraft-paper-food-tray-10-oz-650-x-475-x-175-inch-rectangle",
    "image": "brown-virgin-kraft-paper-food-tray-10-oz-650-x-475-x-175-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "10 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "10-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-10-oz-650-x-475-x-175-inch-rectangle"
  },
  {
    "sourceId": 5616,
    "name": "Brown Virgin Kraft Paper Food Tray 18 OZ - 5.5 X 5.5 X 1.5 Inch - Square",
    "slug": "brown-virgin-kraft-paper-food-tray-18-oz-55-x-55-x-15-inch-square",
    "image": "brown-virgin-kraft-paper-food-tray-18-oz-55-x-55-x-15-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "18 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "18-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-18-oz-55-x-55-x-15-inch-square"
  },
  {
    "sourceId": 5618,
    "name": "Brown Virgin Kraft Paper Food Tray 18 OZ - 7.5 X 4 X 1.5 Inch - Rectangle",
    "slug": "brown-virgin-kraft-paper-food-tray-18-oz-75-x-4-x-15-inch-rectangle",
    "image": "brown-virgin-kraft-paper-food-tray-18-oz-75-x-4-x-15-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "18 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "18-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-18-oz-75-x-4-x-15-inch-rectangle"
  },
  {
    "sourceId": 5620,
    "name": "Brown Virgin Kraft Paper Food Tray 21 OZ - 7.5 X 7.5 X 2 Inch - Square",
    "slug": "brown-virgin-kraft-paper-food-tray-21-oz-75-x-75-x-2-inch-square",
    "image": "brown-virgin-kraft-paper-food-tray-21-oz-75-x-75-x-2-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "21 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "21-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-21-oz-75-x-75-x-2-inch-square"
  },
  {
    "sourceId": 5610,
    "name": "Brown Virgin Kraft Paper Food Tray 23 OZ - 8.5 X 6.25 X 2.25 Inch - Rectangle",
    "slug": "brown-virgin-kraft-paper-food-tray-23-oz-85-x-625-x-225-inch-rectangle",
    "image": "brown-virgin-kraft-paper-food-tray-23-oz-85-x-625-x-225-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "23 Oz Paper Boat Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "23-oz-paper-boat-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-23-oz-85-x-625-x-225-inch-rectangle"
  },
  {
    "sourceId": 5622,
    "name": "Brown Virgin Kraft Paper Food Tray 36 OZ - 10 X 7 X 2 Inch - Rectangle",
    "slug": "brown-virgin-kraft-paper-food-tray-36-oz-10-x-7-x-2-inch-rectangle",
    "image": "brown-virgin-kraft-paper-food-tray-36-oz-10-x-7-x-2-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "36 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "36-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-36-oz-10-x-7-x-2-inch-rectangle"
  },
  {
    "sourceId": 5608,
    "name": "Brown Virgin Kraft Paper Food Tray 4 OZ - 4.75 X 3 X 1 Inch - Rectangle",
    "slug": "brown-virgin-kraft-paper-food-tray-4-oz-475-x-3-x-1-inch-rectangle",
    "image": "brown-virgin-kraft-paper-food-tray-4-oz-475-x-3-x-1-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "4 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "4-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-4-oz-475-x-3-x-1-inch-rectangle"
  },
  {
    "sourceId": 5624,
    "name": "Brown Virgin Kraft Paper Food Tray 46 OZ  - 9.5 X 9.5 X 2 Inch - Square",
    "slug": "brown-virgin-kraft-paper-food-tray-46-oz-95-x-95-x-2-inch-square",
    "image": "brown-virgin-kraft-paper-food-tray-46-oz-95-x-95-x-2-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "46 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "46-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-46-oz-95-x-95-x-2-inch-square"
  },
  {
    "sourceId": 5628,
    "name": "Brown Virgin Kraft Paper Food Tray 7 OZ - 4 X 4 X 1.5 Inch - Square",
    "slug": "brown-virgin-kraft-paper-food-tray-7-oz-4-x-4-x-15-inch-square",
    "image": "brown-virgin-kraft-paper-food-tray-7-oz-4-x-4-x-15-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "7 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "7-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-7-oz-4-x-4-x-15-inch-square"
  },
  {
    "sourceId": 5613,
    "name": "Brown Virgin Kraft Paper Food Tray 8 OZ - 5 X 3.25 x 1.50 Inch - Rectangle",
    "slug": "brown-virgin-kraft-paper-food-tray-8-oz-5-x-325-x-150-inch-rectangle",
    "image": "brown-virgin-kraft-paper-food-tray-8-oz-5-x-325-x-150-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "8 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "8-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-8-oz-5-x-325-x-150-inch-rectangle"
  },
  {
    "sourceId": 5626,
    "name": "Brown Virgin Kraft Paper Food Tray 9 OZ  - 5 X 5 X 1.5 Inch - Square",
    "slug": "brown-virgin-kraft-paper-food-tray-9-oz-5-x-5-x-15-inch-square",
    "image": "brown-virgin-kraft-paper-food-tray-9-oz-5-x-5-x-15-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "9 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "9-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/brown-virgin-kraft-paper-food-tray-9-oz-5-x-5-x-15-inch-square"
  },
  {
    "sourceId": 2082,
    "name": "Disposable Kraft Paper Tea Coaster 4 Inch Round",
    "slug": "disposable-kraft-paper-tea-coaster-4-inch-round",
    "image": "disposable-kraft-paper-tea-coaster-4-inch-round.webp",
    "unit": "Piece",
    "sourceCategory": "Disposable Paper Tea Coaster",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "disposable-paper-tea-coaster",
    "sourceUrl": "https://www.gujaratshopee.com/product/disposable-kraft-paper-tea-coaster-4-inch-round"
  },
  {
    "sourceId": 2081,
    "name": "Disposable Kraft Paper Tea Coaster 4 Inch Square",
    "slug": "disposable-kraft-paper-tea-coaster-4-inch-square",
    "image": "disposable-kraft-paper-tea-coaster-4-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "Disposable Paper Tea Coaster",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "disposable-paper-tea-coaster",
    "sourceUrl": "https://www.gujaratshopee.com/product/disposable-kraft-paper-tea-coaster-4-inch-square"
  },
  {
    "sourceId": 5679,
    "name": "Disposable White Paper Tea Coaster 4 Inch Round",
    "slug": "disposable-white-paper-tea-coaster-4-inch-round",
    "image": "disposable-white-paper-tea-coaster-4-inch-round.webp",
    "unit": "Piece",
    "sourceCategory": "Disposable Paper Tea Coaster",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "disposable-paper-tea-coaster",
    "sourceUrl": "https://www.gujaratshopee.com/product/disposable-white-paper-tea-coaster-4-inch-round"
  },
  {
    "sourceId": 5680,
    "name": "Disposable White Paper Tea Coaster 4 Inch Square",
    "slug": "disposable-white-paper-tea-coaster-4-inch-square",
    "image": "disposable-white-paper-tea-coaster-4-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "Disposable Paper Tea Coaster",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "disposable-paper-tea-coaster",
    "sourceUrl": "https://www.gujaratshopee.com/product/disposable-white-paper-tea-coaster-4-inch-square"
  },
  {
    "sourceId": 5519,
    "name": "PAPER LID FOR 50 ML CUP",
    "slug": "paper-lid-for-50-ml-cup",
    "image": "paper-lid-for-50-ml-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Small Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "small-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/paper-lid-for-50-ml-cup"
  },
  {
    "sourceId": 5520,
    "name": "PLASTIC LID FOR 100 / 150 ML CUP",
    "slug": "plastic-lid-for-100-150-ml-cup",
    "image": "plastic-lid-for-100-150-ml-cup.webp",
    "unit": "Piece",
    "sourceCategory": "Small Paper Cup",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "small-paper-cup",
    "sourceUrl": "https://www.gujaratshopee.com/product/plastic-lid-for-100-150-ml-cup"
  },
  {
    "sourceId": 3961,
    "name": "White Kraft  Paper One Cup Holder",
    "slug": "white-kraft-paper-one-cup-holder",
    "image": "white-kraft-paper-one-cup-holder.webp",
    "unit": "Piece",
    "sourceCategory": "1 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "1-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-one-cup-holder"
  },
  {
    "sourceId": 3782,
    "name": "White Kraft Paper Clamshell Food Box 3.5 x 3.5 x 2 Inch",
    "slug": "white-kraft-paper-clamshell-food-box-35-x-35-x-2-inch",
    "image": "white-kraft-paper-clamshell-food-box-35-x-35-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Clamshell Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "clamshell-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-clamshell-food-box-35-x-35-x-2-inch"
  },
  {
    "sourceId": 5901,
    "name": "White Kraft Paper Clamshell Food Box 4 x 4 x 3.15 Inch",
    "slug": "white-kraft-paper-clamshell-food-box-4-x-4-x-315-inch",
    "image": "white-kraft-paper-clamshell-food-box-4-x-4-x-315-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Clamshell Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "clamshell-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-clamshell-food-box-4-x-4-x-315-inch"
  },
  {
    "sourceId": 5903,
    "name": "White Kraft Paper Clamshell Food Box 7.5 x 4.25 x 2.75 Inch",
    "slug": "white-kraft-paper-clamshell-food-box-75-x-425-x-275-inch",
    "image": "white-kraft-paper-clamshell-food-box-75-x-425-x-275-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Clamshell Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "clamshell-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-clamshell-food-box-75-x-425-x-275-inch"
  },
  {
    "sourceId": 5906,
    "name": "White Kraft Paper Clamshell Food Box 9 x 9 x 2.5 Inch",
    "slug": "white-kraft-paper-clamshell-food-box-9-x-9-x-25-inch",
    "image": "white-kraft-paper-clamshell-food-box-9-x-9-x-25-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Clamshell Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "clamshell-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-clamshell-food-box-9-x-9-x-25-inch"
  },
  {
    "sourceId": 5295,
    "name": "White Kraft Paper Cone French Fries Box With Dip Attachment 2.75 x 2.75 x 6.5 Inch",
    "slug": "white-kraft-paper-cone-french-fries-box-with-dip-attachment-275-x-275-x-65-inch",
    "image": "white-kraft-paper-cone-french-fries-box-with-dip-attachment-275-x-275-x-65-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Cone Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "cone-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-cone-french-fries-box-with-dip-attachment-275-x-275-x-65-inch"
  },
  {
    "sourceId": 3946,
    "name": "White Kraft Paper Cone French Fries Box With Dip Attachment 3.25 x 3.25 x 7.5 Inch",
    "slug": "white-kraft-paper-cone-french-fries-box-with-dip-attachment-325-x-325-x-75-inch",
    "image": "white-kraft-paper-cone-french-fries-box-with-dip-attachment-325-x-325-x-75-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Cone Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "cone-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-cone-french-fries-box-with-dip-attachment-325-x-325-x-75-inch"
  },
  {
    "sourceId": 3947,
    "name": "White Kraft Paper Cone French Fries Box With Dip Attachment 3.5 x 3.5 x 8.5 Inch",
    "slug": "white-kraft-paper-cone-french-fries-box-with-dip-attachment-35-x-35-x-85-inch",
    "image": "white-kraft-paper-cone-french-fries-box-with-dip-attachment-35-x-35-x-85-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Cone Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "cone-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-cone-french-fries-box-with-dip-attachment-35-x-35-x-85-inch"
  },
  {
    "sourceId": 4724,
    "name": "White Kraft Paper Dosa Box 13 x 3 x 1.75 Inch",
    "slug": "white-kraft-paper-dosa-box-13-x-3-x-175-inch",
    "image": "white-kraft-paper-dosa-box-13-x-3-x-175-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Dosa Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-dosa-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-dosa-box-13-x-3-x-175-inch"
  },
  {
    "sourceId": 5704,
    "name": "White Kraft Paper Dosa Box 14.5 x 3.5 x 2.5 Inch",
    "slug": "white-kraft-paper-dosa-box-145-x-35-x-25-inch",
    "image": "white-kraft-paper-dosa-box-145-x-35-x-25-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Dosa Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-dosa-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-dosa-box-145-x-35-x-25-inch"
  },
  {
    "sourceId": 3966,
    "name": "White Kraft Paper Four Cup Holder Tray",
    "slug": "white-kraft-paper-four-cup-holder-tray",
    "image": "white-kraft-paper-four-cup-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "4 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "4-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-four-cup-holder-tray"
  },
  {
    "sourceId": 3968,
    "name": "White Kraft Paper Four Cup Holder With Handle",
    "slug": "white-kraft-paper-four-cup-holder-with-handle",
    "image": "white-kraft-paper-four-cup-holder-with-handle.webp",
    "unit": "Piece",
    "sourceCategory": "4 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "4-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-four-cup-holder-with-handle"
  },
  {
    "sourceId": 3964,
    "name": "White Kraft Paper One Cup Holder Tray",
    "slug": "white-kraft-paper-one-cup-holder-tray",
    "image": "white-kraft-paper-one-cup-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "1 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "1-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-one-cup-holder-tray"
  },
  {
    "sourceId": 4318,
    "name": "White Kraft Paper Pillow Food Box 5 x 3 x 0.75 Inch",
    "slug": "white-kraft-paper-pillow-food-box-5-x-3-x-075-inch",
    "image": "white-kraft-paper-pillow-food-box-5-x-3-x-075-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-pillow-food-box-5-x-3-x-075-inch"
  },
  {
    "sourceId": 4319,
    "name": "White Kraft Paper Pillow Food Box 7 x 4.5 x 1.25 Inch",
    "slug": "white-kraft-paper-pillow-food-box-7-x-45-x-125-inch",
    "image": "white-kraft-paper-pillow-food-box-7-x-45-x-125-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-pillow-food-box-7-x-45-x-125-inch"
  },
  {
    "sourceId": 4320,
    "name": "White Kraft Paper Pillow Food Box 9 x 3 x 1.5 Inch",
    "slug": "white-kraft-paper-pillow-food-box-9-x-3-x-15-inch",
    "image": "white-kraft-paper-pillow-food-box-9-x-3-x-15-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-pillow-food-box-9-x-3-x-15-inch"
  },
  {
    "sourceId": 4327,
    "name": "White Kraft Paper Pillow Food Box With Window 5 x 3 x 0.75 Inch",
    "slug": "white-kraft-paper-pillow-food-box-with-window-5-x-3-x-075-inch",
    "image": "white-kraft-paper-pillow-food-box-with-window-5-x-3-x-075-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-pillow-food-box-with-window-5-x-3-x-075-inch"
  },
  {
    "sourceId": 4328,
    "name": "White Kraft Paper Pillow Food Box With Window 7 x 4.5 x 1.25 Inch",
    "slug": "white-kraft-paper-pillow-food-box-with-window-7-x-45-x-125-inch",
    "image": "white-kraft-paper-pillow-food-box-with-window-7-x-45-x-125-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-pillow-food-box-with-window-7-x-45-x-125-inch"
  },
  {
    "sourceId": 4329,
    "name": "White Kraft Paper Pillow Food Box With Window 9 x 3 x 1.5 Inch",
    "slug": "white-kraft-paper-pillow-food-box-with-window-9-x-3-x-15-inch",
    "image": "white-kraft-paper-pillow-food-box-with-window-9-x-3-x-15-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pillow Paper Food Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "pillow-paper-food-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-pillow-food-box-with-window-9-x-3-x-15-inch"
  },
  {
    "sourceId": 374,
    "name": "White Kraft Paper Pocket French Fries Box 4 x 3 x 2 Inch",
    "slug": "white-kraft-paper-pocket-french-fries-box-4-x-3-x-2-inch",
    "image": "white-kraft-paper-pocket-french-fries-box-4-x-3-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pocket Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "pocket-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-pocket-french-fries-box-4-x-3-x-2-inch"
  },
  {
    "sourceId": 3321,
    "name": "White Kraft Paper Pocket French Fries Box 5 x 3 x 2 Inch",
    "slug": "white-kraft-paper-pocket-french-fries-box-5-x-3-x-2-inch",
    "image": "white-kraft-paper-pocket-french-fries-box-5-x-3-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Pocket Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "pocket-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-pocket-french-fries-box-5-x-3-x-2-inch"
  },
  {
    "sourceId": 4891,
    "name": "White Kraft Paper Rectangle French fries Box 6.25 x 4 x 1.25 Inch",
    "slug": "white-kraft-paper-rectangle-french-fries-box-625-x-4-x-125-inch",
    "image": "white-kraft-paper-rectangle-french-fries-box-625-x-4-x-125-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Rectangle Paper French Fries Box",
    "sourceParentCategory": "PAPER FRENCH FRIES BOX - FOOD DISPOSABLE",
    "sourceCategorySlug": "rectangle-paper-french-fries-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-rectangle-french-fries-box-625-x-4-x-125-inch"
  },
  {
    "sourceId": 5699,
    "name": "White Kraft Paper Square Popcorn Box 100 x 70 x 160 MM (Top X Bottom X Height)",
    "slug": "white-kraft-paper-square-popcorn-box-100-x-70-x-160-mm-top-x-bottom-x-height",
    "image": "white-kraft-paper-square-popcorn-box-100-x-70-x-160-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-square-popcorn-box-100-x-70-x-160-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5698,
    "name": "White Kraft Paper Square Popcorn Box 120 x 80 x 180 MM (Top X Bottom X Height)",
    "slug": "white-kraft-paper-square-popcorn-box-120-x-80-x-180-mm-top-x-bottom-x-height",
    "image": "white-kraft-paper-square-popcorn-box-120-x-80-x-180-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-square-popcorn-box-120-x-80-x-180-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 3970,
    "name": "White Kraft Paper Square Popcorn Box 130 x 55 x 195 MM (Top X Bottom X Height)",
    "slug": "white-kraft-paper-square-popcorn-box-130-x-55-x-195-mm-top-x-bottom-x-height",
    "image": "white-kraft-paper-square-popcorn-box-130-x-55-x-195-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-square-popcorn-box-130-x-55-x-195-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5702,
    "name": "White Kraft Paper Square Popcorn Box 70 x 50 x 100 MM (Top X Bottom X Height)",
    "slug": "white-kraft-paper-square-popcorn-box-70-x-50-x-100-mm-top-x-bottom-x-height",
    "image": "white-kraft-paper-square-popcorn-box-70-x-50-x-100-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-square-popcorn-box-70-x-50-x-100-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5701,
    "name": "White Kraft Paper Square Popcorn Box 80 x 60 x 120 MM (Top X Bottom X Height)",
    "slug": "white-kraft-paper-square-popcorn-box-80-x-60-x-120-mm-top-x-bottom-x-height",
    "image": "white-kraft-paper-square-popcorn-box-80-x-60-x-120-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-square-popcorn-box-80-x-60-x-120-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5700,
    "name": "White Kraft Paper Square Popcorn Box 90 x 65 x 140 MM (Top X Bottom X Height)",
    "slug": "white-kraft-paper-square-popcorn-box-90-x-65-x-140-mm-top-x-bottom-x-height",
    "image": "white-kraft-paper-square-popcorn-box-90-x-65-x-140-mm-top-x-bottom-x-height.webp",
    "unit": "Piece",
    "sourceCategory": "Square Paper Popcorn Box",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "square-paper-popcorn-box",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-square-popcorn-box-90-x-65-x-140-mm-top-x-bottom-x-height"
  },
  {
    "sourceId": 5261,
    "name": "White Kraft Paper Sushi Box 11 x 2 x 2 Inch",
    "slug": "white-kraft-paper-sushi-box-11-x-2-x-2-inch",
    "image": "white-kraft-paper-sushi-box-11-x-2-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-sushi-box-11-x-2-x-2-inch"
  },
  {
    "sourceId": 5393,
    "name": "White Kraft Paper Sushi Box 7 x 2.25 x 2.25 Inch",
    "slug": "white-kraft-paper-sushi-box-7-x-225-x-225-inch",
    "image": "white-kraft-paper-sushi-box-7-x-225-x-225-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-sushi-box-7-x-225-x-225-inch"
  },
  {
    "sourceId": 5394,
    "name": "White Kraft Paper Sushi Box 8.50 x 2.25 x 2.25 Inch",
    "slug": "white-kraft-paper-sushi-box-850-x-225-x-225-inch",
    "image": "white-kraft-paper-sushi-box-850-x-225-x-225-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-sushi-box-850-x-225-x-225-inch"
  },
  {
    "sourceId": 5710,
    "name": "White Kraft Paper Sushi Box With Window 11 x 2 x 2 Inch",
    "slug": "white-kraft-paper-sushi-box-with-window-11-x-2-x-2-inch",
    "image": "white-kraft-paper-sushi-box-with-window-11-x-2-x-2-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-sushi-box-with-window-11-x-2-x-2-inch"
  },
  {
    "sourceId": 5707,
    "name": "White Kraft Paper Sushi Box With Window 7 x 2.25 x 2.25 Inch",
    "slug": "white-kraft-paper-sushi-box-with-window-7-x-225-x-225-inch",
    "image": "white-kraft-paper-sushi-box-with-window-7-x-225-x-225-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-sushi-box-with-window-7-x-225-x-225-inch"
  },
  {
    "sourceId": 5708,
    "name": "White Kraft Paper Sushi Box With Window 8.50 x 2.25 x 2.25 Inch",
    "slug": "white-kraft-paper-sushi-box-with-window-850-x-225-x-225-inch",
    "image": "white-kraft-paper-sushi-box-with-window-850-x-225-x-225-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-sushi-box-with-window-850-x-225-x-225-inch"
  },
  {
    "sourceId": 5392,
    "name": "White Kraft Paper Sushi Tray 8.50 x 2.25 x 1.50 Inch",
    "slug": "white-kraft-paper-sushi-tray-850-x-225-x-150-inch",
    "image": "white-kraft-paper-sushi-tray-850-x-225-x-150-inch.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Sushi Box And Tray",
    "sourceParentCategory": "PAPER FAST FOOD BOXES - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-sushi-box-and-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-sushi-tray-850-x-225-x-150-inch"
  },
  {
    "sourceId": 3963,
    "name": "White Kraft Paper Three Cup Holder",
    "slug": "white-kraft-paper-three-cup-holder",
    "image": "white-kraft-paper-three-cup-holder.webp",
    "unit": "Piece",
    "sourceCategory": "3 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "3-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-three-cup-holder"
  },
  {
    "sourceId": 3967,
    "name": "White Kraft Paper Two  Cup Holder",
    "slug": "white-kraft-paper-two-cup-holder",
    "image": "white-kraft-paper-two-cup-holder.webp",
    "unit": "Piece",
    "sourceCategory": "2 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "2-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-two-cup-holder"
  },
  {
    "sourceId": 3950,
    "name": "White Kraft Paper Two Container Holder Tray",
    "slug": "white-kraft-paper-two-container-holder-tray",
    "image": "white-kraft-paper-two-container-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "Paper Container Holder Tray",
    "sourceParentCategory": "PAPER CONTAINER  - FOOD DISPOSABLE",
    "sourceCategorySlug": "paper-container-holder-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-two-container-holder-tray"
  },
  {
    "sourceId": 3962,
    "name": "White Kraft Paper Two Cup Holder",
    "slug": "white-kraft-paper-two-cup-holder-69",
    "image": "white-kraft-paper-two-cup-holder-69.webp",
    "unit": "Piece",
    "sourceCategory": "2 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "2-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-two-cup-holder-69"
  },
  {
    "sourceId": 3965,
    "name": "White Kraft Paper Two Cup Holder Tray",
    "slug": "white-kraft-paper-two-cup-holder-tray",
    "image": "white-kraft-paper-two-cup-holder-tray.webp",
    "unit": "Piece",
    "sourceCategory": "2 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "2-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-paper-two-cup-holder-tray"
  },
  {
    "sourceId": 3516,
    "name": "White Kraft Two Cup Holder With Handle",
    "slug": "white-kraft-two-cup-holder-with-handle",
    "image": "white-kraft-two-cup-holder-with-handle.webp",
    "unit": "Piece",
    "sourceCategory": "2 Paper Cup Holder",
    "sourceParentCategory": "PAPER CUP - FOOD DISPOSABLE",
    "sourceCategorySlug": "2-paper-cup-holder",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-kraft-two-cup-holder-with-handle"
  },
  {
    "sourceId": 5598,
    "name": "White Virgin Kraft Paper Food Tray 10 OZ - 6.50 X 4.75 X 1.75 Inch - Rectangle",
    "slug": "white-virgin-kraft-paper-food-tray-10-oz-650-x-475-x-175-inch-rectangle",
    "image": "white-virgin-kraft-paper-food-tray-10-oz-650-x-475-x-175-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "10 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "10-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-10-oz-650-x-475-x-175-inch-rectangle"
  },
  {
    "sourceId": 5617,
    "name": "White Virgin Kraft Paper Food Tray 18 OZ - 5.5 X 5.5 X 1.5 Inch - Square",
    "slug": "white-virgin-kraft-paper-food-tray-18-oz-55-x-55-x-15-inch-square",
    "image": "white-virgin-kraft-paper-food-tray-18-oz-55-x-55-x-15-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "18 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "18-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-18-oz-55-x-55-x-15-inch-square"
  },
  {
    "sourceId": 5619,
    "name": "White Virgin Kraft Paper Food Tray 18 OZ - 7.5 X 4 X 1.5 Inch - Rectangle",
    "slug": "white-virgin-kraft-paper-food-tray-18-oz-75-x-4-x-15-inch-rectangle",
    "image": "white-virgin-kraft-paper-food-tray-18-oz-75-x-4-x-15-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "18 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "18-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-18-oz-75-x-4-x-15-inch-rectangle"
  },
  {
    "sourceId": 5621,
    "name": "White Virgin Kraft Paper Food Tray 21 OZ - 7.5 X 7.5 X 2 Inch - Square",
    "slug": "white-virgin-kraft-paper-food-tray-21-oz-75-x-75-x-2-inch-square",
    "image": "white-virgin-kraft-paper-food-tray-21-oz-75-x-75-x-2-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "21 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "21-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-21-oz-75-x-75-x-2-inch-square"
  },
  {
    "sourceId": 5599,
    "name": "White Virgin Kraft Paper Food Tray 23 OZ - 8.5 X 6.25 X 2.25 Inch - Rectangle",
    "slug": "white-virgin-kraft-paper-food-tray-23-oz-85-x-625-x-225-inch-rectangle",
    "image": "white-virgin-kraft-paper-food-tray-23-oz-85-x-625-x-225-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "23 Oz Paper Boat Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "23-oz-paper-boat-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-23-oz-85-x-625-x-225-inch-rectangle"
  },
  {
    "sourceId": 5623,
    "name": "White Virgin Kraft Paper Food Tray 36 OZ - 10 X 7 X 2 Inch - Rectangle",
    "slug": "white-virgin-kraft-paper-food-tray-36-oz-10-x-7-x-2-inch-rectangle",
    "image": "white-virgin-kraft-paper-food-tray-36-oz-10-x-7-x-2-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "36 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "36-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-36-oz-10-x-7-x-2-inch-rectangle"
  },
  {
    "sourceId": 5605,
    "name": "White Virgin Kraft Paper Food Tray 4 OZ - 4.75 X 3 X 1 Inch - Rectangle",
    "slug": "white-virgin-kraft-paper-food-tray-4-oz-475-x-3-x-1-inch-rectangle",
    "image": "white-virgin-kraft-paper-food-tray-4-oz-475-x-3-x-1-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "4 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "4-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-4-oz-475-x-3-x-1-inch-rectangle"
  },
  {
    "sourceId": 5625,
    "name": "White Virgin Kraft Paper Food Tray 46 OZ - 9.5 X 9.5 X 2 Inch - Square",
    "slug": "white-virgin-kraft-paper-food-tray-46-oz-95-x-95-x-2-inch-square",
    "image": "white-virgin-kraft-paper-food-tray-46-oz-95-x-95-x-2-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "46 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "46-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-46-oz-95-x-95-x-2-inch-square"
  },
  {
    "sourceId": 5629,
    "name": "White Virgin Kraft Paper Food Tray 7 OZ - 4 X 4 X 1.5 Inch - Square",
    "slug": "white-virgin-kraft-paper-food-tray-7-oz-4-x-4-x-15-inch-square",
    "image": "white-virgin-kraft-paper-food-tray-7-oz-4-x-4-x-15-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "7 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "7-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-7-oz-4-x-4-x-15-inch-square"
  },
  {
    "sourceId": 5601,
    "name": "White Virgin Kraft Paper Food Tray 8 OZ - 5 X 3.25 X 1.50 Inch - Rectangle",
    "slug": "white-virgin-kraft-paper-food-tray-8-oz-5-x-325-x-150-inch-rectangle",
    "image": "white-virgin-kraft-paper-food-tray-8-oz-5-x-325-x-150-inch-rectangle.webp",
    "unit": "Piece",
    "sourceCategory": "8 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "8-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-8-oz-5-x-325-x-150-inch-rectangle"
  },
  {
    "sourceId": 5627,
    "name": "White Virgin Kraft Paper Food Tray 9 OZ - 5 X 5 X 1.5 Inch - Square",
    "slug": "white-virgin-kraft-paper-food-tray-9-oz-5-x-5-x-15-inch-square",
    "image": "white-virgin-kraft-paper-food-tray-9-oz-5-x-5-x-15-inch-square.webp",
    "unit": "Piece",
    "sourceCategory": "9 Oz Paper Food Tray",
    "sourceParentCategory": "PAPER FOOD TRAY - FOOD DISPOSABLE",
    "sourceCategorySlug": "9-oz-paper-food-tray",
    "sourceUrl": "https://www.gujaratshopee.com/product/white-virgin-kraft-paper-food-tray-9-oz-5-x-5-x-15-inch-square"
  }
] satisfies GujaratShopeeRow[];

function includesAny(value: string, needles: string[]) {
  const lower = value.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

function compactLabel(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function inferShape(row: GujaratShopeeRow): ContainerShape {
  const text = [row.name, row.sourceCategory, row.sourceParentCategory].join(" ").toLowerCase();

  if (includesAny(text, ["tray", "fries", "french fries", "boat", "cone", "sleeve"])) {
    return "tray";
  }

  if (includesAny(text, ["pizza", "square", "octagonal", "paper box", "meal box", "food box", "noodle", "wrapping", "baking paper"])) {
    return "rectangular";
  }

  if (includesAny(text, ["cup", "bowl", "container", "lid", "round"])) {
    return "round";
  }

  return "rectangular";
}

function inferProductRange(row: GujaratShopeeRow) {
  const text = [row.name, row.sourceParentCategory, row.sourceCategory, row.sourceCategorySlug].join(" ").toLowerCase();

  if (text.includes("paper bowl")) return "Paper Bowl";
  if (text.includes("paper container")) return "Paper Container";
  if (text.includes("paper cup") || text.includes("tea coaster") || text.includes("beverage")) return "Paper Cups";
  if (text.includes("pizza box")) return "Pizza Box";
  if (text.includes("wrapping paper")) return "Food Wrapping Paper";
  if (text.includes("bake oven") || text.includes("baking paper")) return "Baking Paper Sheet";
  if (text.includes("noodle") || text.includes("wok box")) return "Noodle Box";
  if (text.includes("fries") || text.includes("french fries")) return "Fries Box";
  if (text.includes("fast food")) return "Paper Fast Food Boxes";
  if (text.includes("compartment")) return "Paper Food Box With Compartment";
  if (text.includes("meal box")) return "Paper Meal Box";
  if (text.includes("food tray")) return "Food Tray";

  return "Paper Packaging";
}

function inferBaseColor(name: string): ContainerColor {
  const lower = name.toLowerCase();
  if (includesAny(lower, ["transparent", "pet", "pp lid", "clear lid"])) return "clear";
  if (lower.includes("black")) return "black";
  if (lower.includes("white")) return "white";
  return "custom";
}

function inferColourOptions(name: string) {
  const options = new Set<string>();
  const colourWords = [
    ["transparent", "Transparent"],
    ["clear", "Transparent"],
    ["black", "Black"],
    ["white", "White"],
    ["brown", "Brown Kraft"],
    ["kraft", "Natural Kraft"],
    ["orange", "Orange"],
    ["red", "Red"],
    ["blue", "Blue"],
    ["green", "Green"],
    ["yellow", "Yellow"],
    ["pink", "Pink"],
    ["magenta", "Magenta"],
    ["silver", "Silver"],
    ["aluminium", "Foil-lined"],
    ["foil", "Foil-lined"],
  ];

  const lower = name.toLowerCase();
  for (const [needle, label] of colourWords) {
    if (lower.includes(needle)) options.add(label);
  }

  if (options.size === 0) options.add("Natural Kraft");
  return Array.from(options);
}

function inferSize(name: string) {
  const patterns = [
    /\b\d+(?:\.\d+)?\s*(?:ml|ltr|liter|litre)\b/i,
    /\b\d+(?:\.\d+)?\s*(?:oz)\b/i,
    /\b\d+(?:\.\d+)?\s*(?:inch)\b/i,
    /\b\d+(?:\.\d+)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[xX]\s*\d+(?:\.\d+)?)?\s*(?:inch|cm|mm)?\b/i,
    /\b\d+\s*(?:gsm|pcs|piece)\b/i,
  ];

  for (const pattern of patterns) {
    const match = name.match(pattern);
    if (match) return compactLabel(match[0].replace(/ml/i, "ML").replace(/oz/i, "Oz").replace(/ltr|liter|litre/i, "Ltr").replace(/inch/i, "Inch"));
  }

  return "Size on request";
}

function inferDimensions(name: string) {
  const dimension = name.match(/\b\d+(?:\.\d+)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[xX]\s*\d+(?:\.\d+)?)?\s*(?:inch|cm|mm)?\b/i);
  if (dimension) return compactLabel(dimension[0].replace(/inch/i, "Inch"));

  const inch = name.match(/\b\d+(?:\.\d+)?\s*inch\b/i);
  if (inch) return compactLabel(inch[0].replace(/inch/i, "Inch"));

  return pending;
}

function inferCapacity(name: string) {
  const capacity = name.match(/\b\d+(?:\.\d+)?\s*(?:ml|ltr|liter|litre|oz)\b/i);
  if (capacity) return compactLabel(capacity[0].replace(/ml/i, "ML").replace(/oz/i, "Oz").replace(/ltr|liter|litre/i, "Ltr"));
  return "Size-specific variant";
}

function inferLidOptions(row: GujaratShopeeRow) {
  const text = [row.name, row.sourceCategorySlug].join(" ").toLowerCase();

  if (text.includes("lid")) return ["Matching Lid"];
  if (includesAny(text, ["pizza", "meal-box", "food-box", "noodle", "container"])) return ["Fold-lock Closure", "Lid option on request"];
  if (text.includes("cup")) return ["Lid option on request", "Sip Lid"];
  if (includesAny(text, ["tray", "fries", "wrap", "baking"])) return ["Open Format"];

  return ["Lid option on request"];
}

function inferMaterial(row: GujaratShopeeRow) {
  const text = [row.name, row.sourceCategory].join(" ").toLowerCase();

  if (includesAny(text, ["aluminium", "foil"])) return "Aluminium foil laminated paper direction";
  if (includesAny(text, ["corrugated", "3 ply", "pizza"])) return "3-ply corrugated paper direction";
  if (includesAny(text, ["baking", "silicone"])) return "Silicone-coated baking paper direction";
  if (includesAny(text, ["wrapping", "wrap"])) return "Food wrapping paper direction";
  if (includesAny(text, ["kraft", "brown"])) return "Food-grade kraft paper direction";
  if (text.includes("white")) return "Food-grade white paper direction";

  return "Food-grade paper packaging direction";
}

function inferApplications(row: GujaratShopeeRow) {
  const text = [row.name, row.sourceParentCategory, row.sourceCategory].join(" ").toLowerCase();

  if (text.includes("pizza")) return ["Pizza delivery", "Garlic bread", "Bakery items", "Takeaway counters"];
  if (text.includes("cup")) return ["Tea service", "Coffee counters", "Beverages", "Events"];
  if (text.includes("bowl")) return ["Soups", "Rice bowls", "Salads", "Desserts"];
  if (text.includes("container")) return ["Soups", "Gravies", "Biryani", "Food delivery"];
  if (text.includes("noodle")) return ["Noodles", "Wok meals", "Asian takeaway", "Food delivery"];
  if (text.includes("fries")) return ["French fries", "Snacks", "QSR counters", "Food festivals"];
  if (text.includes("wrapping")) return ["Burgers", "Sandwiches", "Rolls", "Bakery packing"];
  if (text.includes("baking")) return ["Bakery prep", "Oven trays", "Cake tins", "Food preparation"];
  if (text.includes("tray")) return ["Snacks", "Fries", "Nachos", "Catering counters"];
  if (text.includes("meal")) return ["Lunch delivery", "Full meals", "Restaurant takeaway", "Catering"];

  return ["Restaurants", "Cloud kitchens", "Caterers", "Takeaway counters"];
}

function inferFeatures(row: GujaratShopeeRow) {
  const features = new Set([
    "Food-service paper packaging",
    "Bulk supply enquiry support",
    "Printed branding discussion",
  ]);
  const text = [row.name, row.sourceCategory].join(" ").toLowerCase();

  if (includesAny(text, ["lid", "lock", "fold", "box"])) features.add("Secure closing direction");
  if (includesAny(text, ["window", "transparent", "pet"])) features.add("Clear product visibility");
  if (includesAny(text, ["grease", "wrapping", "baking", "fries"])) features.add("Grease-resistant direction");
  if (includesAny(text, ["foil", "aluminium", "noodle"])) features.add("Heat-retention direction");
  if (text.includes("compartment")) features.add("Compartment separation");

  return Array.from(features);
}

function inferCompartments(name: string) {
  const match = name.match(/\b([2-6])\s*compartment/i);
  if (match) return [Number(match[1])];
  return [1];
}

function inferAccent(row: GujaratShopeeRow): Product["visual"]["accent"] {
  const text = [row.name, row.sourceCategory].join(" ").toLowerCase();
  if (includesAny(text, ["rice", "meal", "biryani", "container"])) return "rice";
  if (includesAny(text, ["noodle", "wok"])) return "noodles";
  if (includesAny(text, ["salad", "bowl", "tray"])) return "salad";
  if (includesAny(text, ["cup", "dessert", "cake", "bakery"])) return "dessert";
  return "empty";
}

export const gujaratShopeeProducts: Product[] = sourceRows.map((row, index) => {
  const size = inferSize(row.name);
  const compartments = inferCompartments(row.name);
  const image = assetPath(variantImageBase + "/" + row.image);
  const lidOptions = inferLidOptions(row);

  return {
    id: "GS-" + row.sourceId,
    slug: row.slug,
    name: row.name,
    category: "Biodegradables",
    productRange: inferProductRange(row),
    shape: inferShape(row),
    shortDescription: row.name + " from Gujarat Shopee's " + row.sourceCategory + " range.",
    description:
      row.name +
      " is listed under Gujarat Shopee's " +
      row.sourceParentCategory.toLowerCase() +
      " category and is presented here for Kanak Mouldings bulk packaging enquiries.",
    capacity: inferCapacity(row.name),
    sizeOptions: [size],
    dimensions: inferDimensions(row.name),
    colourOptions: inferColourOptions(row.name),
    lidOptions,
    compartments,
    material: inferMaterial(row),
    applications: inferApplications(row),
    features: inferFeatures(row),
    customisation: "Size, colour, print direction, lid pairing and order quantity can be confirmed during quotation.",
    image,
    gallery: [image],
    featured: false,
    isPublished: true,
    order: 1000 + index,
    placeholderSpecification: true,
    visual: {
      baseColor: inferBaseColor(row.name),
      compartments: compartments[0],
      lid: lidOptions.some((option) => !option.toLowerCase().includes("open")),
      accent: inferAccent(row),
    },
  };
});
