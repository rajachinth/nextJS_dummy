/************* Types of modules exports in NodeJS *************
 * Use below two ways to export nodeJS modules
 *
 * 1. modules.export = { }
 * 2. modules.export = () => {return{}} // nextJS calls this function by passing arguments to this function call
 *
 * -> Refer docs to know on the "parameters" to this function call
 *
 */

/************ PHASES in NextJS *****************
 * -> Below are the phases imported from "next/constants"
 * -> PHASE_DEVELOPMENT_SERVER -> next dev
 * -> PHASE_EXPORT -> next export
 * -> PHASE_PRODUCTION_BUILD  -> next build
 *
 * -> PHASE_PRODUCTION_SERVER -> runs after the build is deployed into production, so adding configs for "PHASE_PRODUCTION_BUILD"
 *      will be same for the "PHASE_PRODUCTION_SERVER"
 */

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_EXPORT,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  console.log(phase === PHASE_DEVELOPMENT_SERVER);
  if (
    phase === PHASE_PRODUCTION_BUILD ||
    PHASE_PRODUCTION_SERVER ||
    PHASE_DEVELOPMENT_SERVER
  ) {
    return {
      async redirects() {
        return [
          {
            source: "/",
            destination: "/nextJS/home",
            permanent: true,
            basePath: false,
          },
        ];
      },
      basePath: "/nextJS",
      env: {
        buildMode: "development",
        versionCode: "V.1.0.0",
      },
    };
  } else {
    return defaultConfig;
  }
};
