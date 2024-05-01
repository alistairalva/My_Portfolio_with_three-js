interface Bio {
    name: string;
    roles: string[];
    description: string;
    github: string;
    resume: string;
    linkedin: string;
    instagram: string;
}

export const bio: Bio = {
    name: "Alistair Alva",
    roles: [
        "Software Developer",
        "Web Developer",
        "Mobile Developer",
        "Programmer",
    ],
    description: "I am a software developer with a passion for programming and problem solving. I have experience in developing web applications, mobile applications, and software solutions. I am proficient in multiple programming languages and technologies, and I am always eager to learn new things. I want to use my skills to be able help people and make a positive impact in the world.",
    github: "https://www.github.com/alistairalva",
    resume: "https://drive.google.com/file/d/1lQggVxcqwVRuHdqFZj0pMkLFTtcTfku5/view?usp=drive_link",
    linkedin: "https://www.linkedin.com/in/alistair-alva",
    instagram: "https://www.instagram.com/alistair.alva",
};

interface Skill {
    name: string;
    image: string;
}

export const skills: Skill[] = [
    {
        name: "React",
        image: "react.png",
    },
    {
        name: "Node.js",
        image: "node.png",
    },
    {
        name: "Express",
        image: "express.png",
    },
    {
        name: ".NET",
        image: "dotnet.png",
    },
    {
        name: "C++",
        image: "cpp.png",
    }
];

interface Experience {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export const experiences: Experience[] = [
    {
        position: "Software Developer",
        company: "Company A",
        startDate: "2020",
        endDate: "2021",
        description: "Developed web applications and software solutions using React, Node.js, and .NET.",
    },
    {
        position: "Web Developer",
        company: "Company B",
        startDate: "2019",
        endDate: "2020",
        description: "Designed and developed websites using HTML, CSS, and JavaScript.",
    },
    {
        position: "Mobile Developer",
        company: "Company C",
        startDate: "2018",
        endDate: "2019",
        description: "Developed mobile applications for Android and iOS using React Native.",
    },
];

interface Education {
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
}

export const education: Education[] = [
    {
        degree: "Bachelor's Degree in Computer Science",
        school: "University A",
        startDate: "2014",
        endDate: "2018",
    },
    {
        degree: "Master's Degree in Computer Engineering",
        school: "University B",
        startDate: "2018",
        endDate: "2020",
    },
];

interface Project {
    name: string;
    description: string;
    technologies: string[];
    github: string;
    demo: string;
}

export const projects: Project[] = [
    {
        name: "Project A",
        description: "A web application that allows users to create and share custom designs.",
        technologies: ["React", "Node.js", "Express"],
        github: "https://www.github.com/projectA",
        demo: "https://www.projectA.com",
    },
    {
        name: "Project B",
        description: "A mobile application that helps users track their fitness goals.",
        technologies: ["React Native", "Firebase"],
        github: "https://www.github.com/projectB",
        demo: "https://www.projectB.com",
    },
    {
        name: "Project C",
        description: "A software solution that automates repetitive tasks for businesses.",
        technologies: [".NET", "C#"],
        github: "https://www.github.com/projectC",
        demo: "https://www.projectC.com",
    },
];