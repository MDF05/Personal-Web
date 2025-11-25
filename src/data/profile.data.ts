export interface SocialLink {
  name: string;
  url: string;
}

export const currentUrl =
  typeof window !== "undefined" ? window.location.origin : "";

export interface ProfileData {
  name: string;
  title: string;
  greeting: string;
  description: string;
  skills: string[];
  experience: Date;
  currentUrl: string;

  // optional data
  height?: string;
  weight?: string;
  footSize?: number;
  ChestCircumference?: number;
  age?: number;
  footLength?: string;

  // social links
  socialMedia?: Record<string, SocialLink>;
}

export const profileData: ProfileData = {
  name: "MUHAMMAD DAVA FAHREZA",
  title: "FULLSTACK Developer",
  greeting: "Hello, I'm",
  description:
    "Specialized in Frontend, Backend, Mobile, WordPress, Machine Learning and more. Versatile Developer Crafting Innovative Solutions and Always evolving with emerging technologies 🚀",
  skills: ["Frontend", "Backend", "Mobile", "WordPress", "Machine Learning"],
  experience: new Date("2024-01-01"),
  currentUrl,

  //! Optional data
  height: "173 cm",
  weight: "62 kg",
  footLength: "26.5 cm - 28 cm (UK 8 - 10)",
  age: new Date().getFullYear() - 2003,

  //! social links
  socialMedia: {
    email: {
      name: "mdavafahreza05@gmail.com",
      url: "mailto:mdavafahreza05@gmail.com",
    },
    whatsapp: {
      name: "+62 822-4685-9943",
      url: "https://wa.me/6282246859943",
    },
    linkedin: {
      name: "Muhammad Dava Fahreza",
      url: "https://www.linkedin.com/in/muhammad-dava-fahreza/",
    },
    github: {
      name: "Muhammad Dava Fahreza",
      url: "http://github.com/mdf05",
    },
    instagram: {
      name: "m_dava_fahreza",
      url: "https://www.instagram.com/m_dava_fahreza/",
    },
    facebook: {
      name: "Mdavafahreza",
      url: "https://www.facebook.com/share/1Bpwc5EYWa/",
    },
    youtube: {
      name: "M Dava 05",
      url: "https://www.youtube.com/@mdavafahreza",
    },
    tiktok: {
      name: "mdavafahreza",
      url: "https://www.tiktok.com/@mdavafahreza",
    },
    twitterOrX: {
      name: "M Dava Fahreza",
      url: "https://x.com/mdavafahreza",
    },
    threads: {
      name: "Mhd Dava Fahreza",
      url: "https://www.threads.com/@muhammaddavafahreza",
    },
    telegram: {
      name: "Mdavafahreza",
      url: "https://t.me/muhammad_dava_fahreza",
    },
    discord: {
      name: "MDava#0691",
      url: "https://discord.gg/3PtwEfAP",
    },
  },
};
