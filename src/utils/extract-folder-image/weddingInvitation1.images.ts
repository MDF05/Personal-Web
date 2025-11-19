// ! laptop
const weddingInvitation1LpImagesObject = import.meta.glob(
  "@/assets/projects/weddingInvitation1/LP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const weddingInvitation1LpImages = Object.values(
  weddingInvitation1LpImagesObject
).map((mod: { default: string }) => mod.default);

// ! tablet
const weddingInvitation1TbImagesObject = import.meta.glob(
  "@/assets/projects/weddingInvitation1/TB/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const weddingInvitation1TbImages = Object.values(
  weddingInvitation1TbImagesObject
).map((mod: { default: string }) => mod.default);

// ! handphone
const weddingInvitation1HPObject = import.meta.glob(
  "@/assets/projects/weddingInvitation1/HP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const weddingInvitation1HPImages = Object.values(
  weddingInvitation1HPObject
).map((mod: { default: string }) => mod.default);

import weddingInvitation1Qrcode from "@/assets/projects/weddingInvitation1/qrcode.png";

export { weddingInvitation1Qrcode };
