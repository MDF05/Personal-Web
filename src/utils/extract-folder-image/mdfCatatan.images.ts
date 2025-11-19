// ! laptop
const mdfCatatanImagesObject = import.meta.glob(
  "@/assets/projects/mdfCatatan/LP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const mdfCatatanLpImages = Object.values(mdfCatatanImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! tablet
const mdfCatatanTbImagesObject = import.meta.glob(
  "@/assets/projects/mdfCatatan/TB/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const mdfCatatanTbImages = Object.values(mdfCatatanTbImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! handphone
const mdfCatatanHPObject = import.meta.glob(
  "@/assets/projects/mdfCatatan/HP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const mdfCatatanHPImages = Object.values(mdfCatatanHPObject).map(
  (mod: { default: string }) => mod.default
);

import mdfCatatanQrcode from "@/assets/projects/mdfCatatan/qrcode.png";

export { mdfCatatanQrcode };
