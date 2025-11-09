// constants.js (update import names/paths to match your asset filenames)
import {
  mobile,
  backend,
  web,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  php,
  java,
  firebase,
  git,
  nodejs,
  mongodb
} from "../assets";

export const navLinks = [
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

export const services = [
  {
    title: "Web Developer",
    icon: web,
    description: "I craft dynamic, responsive, and visually stunning web experiences using modern frameworks like React and Next.js. \n\n Turning ideas into interactive realities on the web!"
  },
  {
    title: "Android Developer",
    icon: mobile,
    description: "Building smooth, intuitive Android apps with Java and Kotlin — blending creativity and performance to bring mobile experiences to life."
  },
  {
    title: "Backend Developer",
    icon: backend,
    description: "Developing fast, scalable, and secure server-side applications using Node.js and Express — powering modern web apps with seamless performance and reliability."
  },
];

export const technologies = [
  { name: "Java", icon: java },
  { name: "JavaScript", icon: javascript },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "React JS", icon: reactjs },
  { name: "Node.js", icon: nodejs },
  { name: "Express", icon: backend }, // Using backend icon as placeholder for Express
  { name: "MongoDB", icon: mongodb },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "PHP", icon: php },
  { name: "Firebase", icon: firebase },
  { name: "Git", icon: git },
];

export const experiences = [
  {
    title: "Full-Stack Developer Intern",
    company_name: "Whitestone Technology",
    date: "Feb 2025 – June 2025",
    icon: web,
    iconBg: "#E6DEDD",
    points: [
      "Built and deployed full-stack web applications using React.js, Node.js, and MySQL, reducing development time by 35%",
      "Designed responsive user interfaces with HTML, CSS, Tailwind CSS, and Bootstrap, improving UI consistency by 50%",
      "Implemented backend logic and RESTful APIs using Node.js and Express, increasing performance efficiency by 40%",
      "Collaborated using Git and GitHub, enabling smoother version control and team workflows with 100% commit tracking"
    ],
  },
  {
    title: "Coding Club Lead",
    company_name: "OMNITRIX Coding Club",
    date: "Oct 2025 – Present",
    icon: web,
    iconBg: "#1F2937",
    points: [
      "Leading the technical division of the club — mentoring peers and guiding members in coding, project building, and innovation.",
      "Organized large-scale tech events, coding competitions, and seminars to promote technical learning and creativity.",
      "Conducted workshops on emerging technologies including web, Android, and backend development.",
      "Encouraged student participation in hackathons and open-source projects, strengthening the campus developer ecosystem.",
      "Collaborated with faculty and sponsors to host impactful technical sessions and ensure smooth event execution."
    ],
  },
  {
    title: "Finalist – Manthan 2025",
    company_name: "National Startup Competition",
    date: "2025",
    icon: mobile,
    iconBg: "#383E56",
    points: [
      "Recognized as one of the top finalists among 600+ startup teams from across the country.",
      "Presented an innovative startup idea focused on solving real-world challenges through technology.",
      "Led the technical development and prototype presentation during the final evaluation round.",
      "Demonstrated entrepreneurial thinking, product design skills, and impactful pitching before industry experts and investors."
    ],
  },
];

export const projects = [
  {
    name: "IRCTC Clone",
    description:
      "A comprehensive Android application clone of IRCTC built with Kotlin and modern Android development practices. Features include train search, PNR tracking, booking management, and real-time updates using MVVM architecture.",
    tags: [
      { name: "kotlin", color: "blue-text-gradient" },
      { name: "android", color: "green-text-gradient" },
      { name: "mvvm", color: "pink-text-gradient" },
    ],
    image: mobile,
    source_code_link: "https://github.com/",
  },
  {
    name: "StayFit - Fitness Tracking App",
    description:
      "A comprehensive Android fitness application built with Java that helps users track their workouts, plan nutrition, and monitor their fitness progress. Features include workout tracking, nutrition planning, and progress monitoring.",
    tags: [
      { name: "android", color: "green-text-gradient" },
      { name: "java", color: "blue-text-gradient" },
      { name: "sqlite", color: "pink-text-gradient" },
    ],
    image: mobile,
    source_code_link: "https://github.com/",
  },
  {
    name: "3D Portfolio",
    description:
      "An interactive and modern portfolio website built using React.js and Three.js. Features 3D animations, responsive design, and dynamic content rendering. Showcases projects and skills in an engaging way.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: web,
    source_code_link: "https://github.com/",
  }
];
