// ! laptop
const coffeshopLpImagesObject = import.meta.glob(
  "@/assets/projects/coffeshop/LP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const coffeshopLpImages = Object.values(coffeshopLpImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! tablet
const coffeshopTbImagesObject = import.meta.glob(
  "@/assets/projects/coffeshop/TB/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const coffeshopTbImages = Object.values(coffeshopTbImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! handphone
const coffeshopHPObject = import.meta.glob(
  "@/assets/projects/coffeshop/HP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const coffeshopHPImages = Object.values(coffeshopHPObject).map(
  (mod: { default: string }) => mod.default
);

import coffeshopQrcode from "@/assets/projects/coffeshop/qrcode.png";

export { coffeshopQrcode };
