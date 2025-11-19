// ! laptop
const circleLpImagesObject = import.meta.glob(
  "@/assets/projects/circle/LP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const circleLpImages = Object.values(circleLpImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! tablet
const circleTbImagesObject = import.meta.glob(
  "@/assets/projects/circle/TB/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const circleTbImages = Object.values(circleTbImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! handphone
const circleHPObject = import.meta.glob(
  "@/assets/projects/circle/HP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const circleHPImages = Object.values(circleHPObject).map(
  (mod: { default: string }) => mod.default
);

import circleQrcode from "@/assets/projects/circle/qrcode.png";

export { circleQrcode };
