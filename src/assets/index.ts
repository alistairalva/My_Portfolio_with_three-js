import logo from "./logo.svg";
import backend from "./backend.png";
import creator from "./creator.png";
import mobile from "./mobile.png";
import web from "./web.png";
import github from "./github.png";
import menu from "./menu.svg";
import close from "./close.svg";

import linux from "./tech/linux.png";
import docker from "./tech/docker.png";
import git from "./tech/git.png";
import azure from "./tech/azure.png";
import javascript from "./tech/javascript.png";
import firebase from "./tech/firebase.png";
import nodejs from "./tech/nodejs.png";
import reactjs from "./tech/reactjs.png";
import java from "./tech/java.png";
import dotnet from "./tech/dotnet.png";
import tailwind from "./tech/tailwind.png";
import typescript from "./tech/typescript.png";
import csharp from "./tech/c_sharp.png";

import redding_designs from "./company/redding_designs.svg";
import goodLife from "./company/goodLife.webp";
import krachi_space from "./company/krachi_space.png";

import emergencyapp from "./emergencyapp.webp";
import emergencyappMobile from "./emergencyapp-mobile.webp";
import restaurant from "./restaurant.webp";
import restaurantMobile from "./restaurant-mobile.webp";
import youtubecharts from "./youtubecharts.webp";
import youtubechartsMobile from "./youtubecharts-mobile.webp";

type AssetModule =
  | string
  | { src?: string; default?: string | { src?: string } };

const toAssetUrl = (asset: AssetModule): string => {
  if (typeof asset === "string") {
    return asset;
  }

  if (typeof asset?.src === "string") {
    return asset.src;
  }

  if (typeof asset?.default === "string") {
    return asset.default;
  }

  if (
    asset?.default &&
    typeof asset.default === "object" &&
    typeof asset.default.src === "string"
  ) {
    return asset.default.src;
  }

  return "";
};

const logoSrc = toAssetUrl(logo);
const backendSrc = toAssetUrl(backend);
const creatorSrc = toAssetUrl(creator);
const mobileSrc = toAssetUrl(mobile);
const webSrc = toAssetUrl(web);
const githubSrc = toAssetUrl(github);
const menuSrc = toAssetUrl(menu);
const closeSrc = toAssetUrl(close);

const linuxSrc = toAssetUrl(linux);
const dockerSrc = toAssetUrl(docker);
const gitSrc = toAssetUrl(git);
const azureSrc = toAssetUrl(azure);
const javascriptSrc = toAssetUrl(javascript);
const firebaseSrc = toAssetUrl(firebase);
const nodejsSrc = toAssetUrl(nodejs);
const reactjsSrc = toAssetUrl(reactjs);
const javaSrc = toAssetUrl(java);
const dotnetSrc = toAssetUrl(dotnet);
const tailwindSrc = toAssetUrl(tailwind);
const typescriptSrc = toAssetUrl(typescript);
const csharpSrc = toAssetUrl(csharp);

const reddingDesignsSrc = toAssetUrl(redding_designs);
const goodLifeSrc = toAssetUrl(goodLife);
const krachiSpaceSrc = toAssetUrl(krachi_space);

const emergencyappSrc = toAssetUrl(emergencyapp);
const emergencyappMobileSrc = toAssetUrl(emergencyappMobile);
const restaurantSrc = toAssetUrl(restaurant);
const restaurantMobileSrc = toAssetUrl(restaurantMobile);
const youtubechartsSrc = toAssetUrl(youtubecharts);
const youtubechartsMobileSrc = toAssetUrl(youtubechartsMobile);

export {
  logoSrc as logo,
  backendSrc as backend,
  creatorSrc as creator,
  mobileSrc as mobile,
  webSrc as web,
  githubSrc as github,
  menuSrc as menu,
  closeSrc as close,
  linuxSrc as linux,
  dockerSrc as docker,
  dotnetSrc as dotnet,
  gitSrc as git,
  azureSrc as azure,
  javascriptSrc as javascript,
  firebaseSrc as firebase,
  nodejsSrc as nodejs,
  reactjsSrc as reactjs,
  javaSrc as java,
  tailwindSrc as tailwind,
  typescriptSrc as typescript,
  csharpSrc as csharp,
  reddingDesignsSrc as redding_designs,
  goodLifeSrc as goodLife,
  krachiSpaceSrc as krachi_space,
  emergencyappSrc as emergencyapp,
  emergencyappMobileSrc as emergencyappMobile,
  restaurantSrc as restaurant,
  restaurantMobileSrc as restaurantMobile,
  youtubechartsSrc as youtubecharts,
  youtubechartsMobileSrc as youtubechartsMobile,
};
