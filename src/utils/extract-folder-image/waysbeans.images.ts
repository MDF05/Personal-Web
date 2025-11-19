// ! laptop
const waysBeans = import.meta.glob(
  "@/assets/projects/waysbeans/LP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const waysBeansLPImages = Object.values(waysBeans).map(
  (mod: { default: string }) => mod.default
);

// ! tablet
const waysbeansTB = import.meta.glob(
  "@/assets/projects/waysbeans/TB/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const waysBeansTBImages = Object.values(waysbeansTB).map(
  (mod: { default: string }) => mod.default
);

// ! handphone
const waysbeansHP = import.meta.glob(
  "@/assets/projects/waysbeans/HP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const waysBeansHPImages = Object.values(waysbeansHP).map(
  (mod: { default: string }) => mod.default
);


 import waysBeansQrCode from "@/assets/projects/waysbeans/qrcode.png"
 
 export {waysBeansQrCode}
