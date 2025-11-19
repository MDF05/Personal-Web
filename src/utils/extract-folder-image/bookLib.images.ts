// ! laptop
const booKLibLpImagesObject = import.meta.glob(
  "@/assets/projects/bookLib/LP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const bookLibLpImages = Object.values(booKLibLpImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! tablet
const bookLibTbImagesObject = import.meta.glob(
  "@/assets/projects/bookLib/TB/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const bookLibTbImages = Object.values(bookLibTbImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! handphone
const bookLibHPObject = import.meta.glob(
  "@/assets/projects/bookLib/HP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const bookLibHPImages = Object.values(bookLibHPObject).map(
  (mod: { default: string }) => mod.default
);

import bookLibQrcode from "@/assets/projects/bookLib/qrcode.png";

export { bookLibQrcode };
