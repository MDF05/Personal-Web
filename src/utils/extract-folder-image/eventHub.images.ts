// ! laptop
const eventHubLpImagesObject = import.meta.glob(
  "@/assets/projects/eventhub/LP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const eventHubLpImages = Object.values(eventHubLpImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! tablet
const eventHubTbImagesObject = import.meta.glob(
  "@/assets/projects/eventhub/TB/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const eventHubTbImages = Object.values(eventHubTbImagesObject).map(
  (mod: { default: string }) => mod.default
);

// ! handphone
const eventHubHPObject = import.meta.glob(
  "@/assets/projects/eventhub/HP/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
  }
);

export const eventHubHPImages = Object.values(eventHubHPObject).map(
  (mod: { default: string }) => mod.default
);



 import eventHubQrcode from "@/assets/projects/eventhub/qrcode.png"

 export {eventHubQrcode}