import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  azure,
  linux,
  reactjs,
  java,
  tailwind,
  dotnet,
  nodejs,
  firebase,
  git,
  docker,
  goodLife,
  emergencyapp,
  restaurant,
  youtubecharts,
  csharp,
} from "../assets";

interface NavLink {
  id: string;
  title: string;
}

export const navLinks: NavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

interface ServiceLink {
  title: string;
  icon: string;
}

const services: ServiceLink[] = [
  {
    title: "Web Development",
    icon: web,
  },
  {
    title: "Mobile Development",
    icon: mobile,
  },
  {
    title: "Backend Development",
    icon: backend,
  },
  {
    title: "Graphic Design",
    icon: creator,
  },
];

interface Technology {
  name: string;
  icon: string;
}

const technologies: Technology[] = [
  {
    name: "Linux",
    icon: linux,
  },
  {
    name: "Azure",
    icon: azure,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: ".NET",
    icon: dotnet,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Firebase",
    icon: firebase,
  },
  {
    name: "C Sharp",
    icon: csharp,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
];

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}
const experiences: Experience[] = [
  {
    title: "Software Developer",
    company_name: "GoodLife Fitness",
    icon: goodLife,
    iconBg: "#383E56",
    date: "May 2024 - August 2024",
    points: [
      "Responsible for re-architecting existing backend RESTful APIs to streamline the organizations microservice architecture.",
      "Part of the team that managed to save over $10,000 per month in cloud compute costs by redesigning existing services to be more efficient and deprecating unnecessary ones.",
      "Managed to achieve a 40% improvement API performance and reduce unnecessary data fetching by 50% from external dependent services.",
      "Leveraged techniques such as OOP, Dependency Injection, multi-layer abstraction, writing robust tests using XUnit and Moq & integrated logging and monitoring to create software that can easily be maintained and supported by future teams.",
      "Created confluence documentation with visual diagrams to act as a containerized source for information for the team.",
      "Participated in daily agile ceremonies such as stand ups, retrospectives, sprint planning, etc.",
    ],
  },
];

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Alistair proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Alistair does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Alistair optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export interface Project {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  source_code_link: string;
}

const projects: Project[] = [
  {
    name: "Emergency Contact App",
    description:
      "A cross-platform mobile app to provide users with a reliable and efficient solution for sending emergency alerts to their selected contacts.",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "expo",
        color: "green-text-gradient",
      },
      {
        name: "firebase",
        color: "pink-text-gradient",
      },
    ],
    image: emergencyapp,
    source_code_link:
      "https://github.com/alistairalva/Emergency_Contact_Application",
  },
  {
    name: "Restaurant Site Builder",
    description:
      "Online platform to allow small restaurants, to build, launch and customize their website for free. Hosting is handled by us. Currently made private due to a security vulnerability.",
    tags: [
      {
        name: "ejs",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "firebase",
        color: "pink-text-gradient",
      },
    ],
    image: restaurant,
    source_code_link: "https://github.com/alistairalva/ApplicationProject",
  },
  {
    name: "Dynamic Youtube data visualizer",
    description:
      "A set of interactive charts using d3,js to visualize raw youtube data. Data is loaded from a CSV file. Currently under revision.",
    tags: [
      {
        name: "vanillajs",
        color: "blue-text-gradient",
      },
      {
        name: "d3.js",
        color: "green-text-gradient",
      },
      {
        name: "html",
        color: "pink-text-gradient",
      },
    ],
    image: youtubecharts,
    source_code_link:
      "https://github.com/alistairalva/Data-Visualizations-For-Youtube-using-d3.js",
  },
];

export { services, technologies, experiences, testimonials, projects };
