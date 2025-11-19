// ! laptop
const dumbmerchbLpImagesObject = import.meta.glob(
  "@/assets/projects/dumbmerch/LP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const dumbmerchLpImages = Object.values(dumbmerchbLpImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! tablet
const dumbmerchTbImagesObject = import.meta.glob(
  "@/assets/projects/dumbmerch/TB/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const dumbmerchTbImages = Object.values(dumbmerchTbImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! handphone
const dumbmerchHPObject = import.meta.glob(
  "@/assets/projects/dumbmerch/HP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const dumbmerchHPImages = Object.values(dumbmerchHPObject).map(
  (mod: { default: string }) => mod.default
);

import dumbmerchQrcode from "@/assets/projects/dumbmerch/qrcode.png";

export { dumbmerchQrcode };
