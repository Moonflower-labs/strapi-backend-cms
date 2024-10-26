import type { StrapiApp } from '@strapi/strapi/admin';
// @ts-ignore
import Logo from "./extensions/logo.jpeg";

export default {
  config: {
    auth: {
      logo: Logo
    },
    menu: {
      logo: Logo,
    },
    head: {
      // Try to change the origin favicon.png file in the
      // root of strapi project if this config don't work.
      favicon: Logo,
    },
    locales: [
      'es',
    ],

  },


  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
