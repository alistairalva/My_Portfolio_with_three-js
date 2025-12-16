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
  redding_designs,
  goodLife,
  krachi_space,
  logo,
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
    title: "Web Developer",
    company_name: "Redding Designs",
    icon: redding_designs,
    iconBg: "#FFF",
    date: "July 2024 – October 2025",
    points: [
      "Developed and maintained full-stack web applications for various clients across healthcare, finance, and e-commerce sectors using WordPress, PHP, Laravel and MySQL, ensuring robust functionality and seamless user experiences.",
      "Improved application performance and search engine visibility by 35% through comprehensive SEO optimization strategies, implementing caching mechanisms, and optimizing database queries for faster load times.",
      "Reduced turnaround time for website updates by over 50% by streamlining deployment processes and implementing efficient version control workflows.",
      "Collaborated with cross-functional teams including designers, project managers, and stakeholders to gather requirements, define project scope, and deliver tailored solutions on time and within budget.",
    ],
  },
  {
    title: "Technology Consultant & Software Developer",
    company_name: "Freelance",
    icon: logo,
    iconBg: "#1E2A38",
    date: "July 2024 – Present",
    points: [
      "Provided end-to-end consulting services for startups and small businesses in FinTech, education, and local services sectors, delivering strategic technology roadmaps and implementation plans.",
      "Improved client productivity by 30% through sales funnel optimization, custom Standard Operating Procedure (SOP) design, and implementation of technical tooling that automated repetitive tasks.",
      "Architected and delivered a fully functional MVP for a cross-border payments platform using Node.js, PostgreSQL, and React, incorporating secure payment processing and real-time transaction tracking.",
      "Led talent acquisition initiatives for roles including tech sales, software development, and operations management, conducting technical interviews and evaluating candidate fit.",
      "Connected small business founders with early-stage investors, facilitating introductions and providing pitch deck support to help secure funding for product development and market expansion.",
    ],
  },
  {
    title: "Backend Engineer (Volunteer)",
    company_name: "Krachi Space Technologies",
    icon: krachi_space,
    iconBg: "#2E3A59",
    date: "January 2024 – Present",
    points: [
      "Built and scaled a distributed backend system for an AI-powered real estate matching platform using Node.js, TypeScript, and AWS Lambda, handling complex matching algorithms and user preference processing.",
      "Developed high-performance microservices that handled over 100,000 concurrent requests with sub-20ms latency by implementing Redis caching strategies and event-driven architecture patterns.",
      "Designed and implemented a comprehensive authentication and authorization system using JWT tokens and Role-Based Access Control (RBAC), ensuring secure access to sensitive real estate data.",
      "Collaborated effectively with a fully remote team across multiple time zones using GitHub for version control, Trello for project management, and Slack for real-time communication and code reviews.",
    ],
  },
  {
    title: "Computer Science Tutor",
    company_name: "Freelance",
    icon: logo,
    iconBg: "#5A607F",
    date: "November 2024 – Present",
    points: [
      "Provided personalized one-on-one and small group tutoring sessions to IGCSE, IB, and A-Level students covering Python programming, database design, data structures, and algorithmic problem-solving.",
      "Taught fundamental software engineering principles including DRY (Don't Repeat Yourself), SOLID design patterns, and clean code practices to build strong programming foundations.",
      "Created an interactive digital curriculum using educational tools like Replit and Jupyter Notebooks to improve student engagement, facilitate hands-on practice, and enable real-time code collaboration.",
      "Helped 90% of students improve their grades by one level or more within two months through customized lesson plans, regular assessments, and targeted feedback on coding assignments.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "GoodLife Fitness",
    icon: goodLife,
    iconBg: "#383E56",
    date: "May 2023 – August 2023",
    points: [
      "Re-architected legacy backend RESTful APIs as part of an organization-wide microservice modernization effort, decomposing monolithic services into scalable, maintainable components.",
      "Contributed to cloud infrastructure cost reductions exceeding $10,000/month by identifying and streamlining compute-intensive services, optimizing resource allocation, and eliminating redundant processes.",
      "Improved API performance by 40% and cut redundant external service calls by 50%.",
      "Used techniques such as OOP, Dependency Injection, layered architecture, and unit testing (XUnit, Moq) to ensure code quality.",
      "Created detailed documentation and architecture diagrams in Confluence to support team onboarding and maintenance.",
      "Actively participated in Agile ceremonies including standups, retrospectives, and sprint planning.",
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
