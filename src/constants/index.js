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
  kotlin,
  firebase,
  git,
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
    description: "Creating responsive web applications using modern frameworks like React and Next.js."
  },
  {
    title: "Android Developer",
    icon: mobile,
    description: "Developing native and hybrid Android applications using Java and Kotlin frameworks."
  },
  {
    title: "Backend Developer",
    icon: backend,
    description: "Developing robust server-side applications with PHP and MySQL, creating efficient and scalable web solutions."
  },
];

export const technologies = [
  {
    name: "Java",
    icon: java,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "PHP",
    icon: php,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Firebase",
    icon: firebase,
  },
  {
    name: "Git",
    icon: git,
  },
];

export const experiences = [
  {
    title: "Full-Stack Developer Intern",
    company_name: "Whitestone Technology",
    date: "Feb 2024 – June 2024",
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
    title: "StayFit App Developer",
    company_name: "Major Academic Project",
    icon: mobile,
    iconBg: "#E6DEDD",
    points: [
      "Developed a fitness tracking Android app using Java and Android Studio, improving feature modularity by 60%",
      "Implemented core functionalities including workout tracking, nutrition planning, and progress monitoring, boosting engagement by 40% in peer testing",
      "Led the UI/UX design process, resulting in 90% positive feedback on usability and aesthetics",
      "Integrated Firebase Authentication and Realtime Database for secure login and cloud-based user data management"
    ],
  },
  
  {
    title: "3D Portfolio Developer",
    company_name: "Personal Project",
    icon: web,
    iconBg: "#383E56",
    date: "2025",
    points: [
      "Built an interactive 3D portfolio using React.js, Three.js, and Tailwind CSS, enhancing user engagement by 60%",
      "Integrated EmailJS for seamless contact form functionality without a backend, increasing user response rate by 40%",
      "Implemented responsive design with cross-device compatibility, reducing bounce rate by 35%",
      "Created smooth 3D animations and interactive UI using libraries like Framer Motion and React-Three-Fiber",
      "Followed modern development practices with Git and GitHub, ensuring 100% code version control and easy updates"
    ],
  },
  {
    title: "E-Sports",
    company_name: "Personal Project",
    icon: web,
    iconBg: "#1F2937",
    date: "2024",
    points: [
      "Developed a dynamic tournament management website using HTML, CSS, PHP, and MySQL with XAMPP as the local server",
      "Enabled organizers to host and manage large-scale e-sports tournaments for both mobile and PC games",
      "Designed user-friendly registration and login modules, improving participant onboarding by 50%",
      "Created admin panel features for event creation, participant tracking, and match scheduling",
      "Ensured secure data handling and efficient backend operations through structured MySQL database design"
    ],
  },
  
  
  
];

export const projects = [
  {
    name: "IRCTC Clone",
    description:
      "A comprehensive Android application clone of IRCTC built with Kotlin and modern Android development practices. Features include train search, PNR tracking, booking management, and real-time updates using MVVM architecture.",
    tags: [
      {
        name: "kotlin",
        color: "blue-text-gradient",
      },
      {
        name: "android",
        color: "green-text-gradient",
      },
      {
        name: "mvvm",
        color: "pink-text-gradient",
      },
    ],
    image: mobile,
    source_code_link: "https://github.com/",
  },
  {
    name: "StayFit - Fitness Tracking App",
    description:
      "A comprehensive Android fitness application built with Java that helps users track their workouts, plan nutrition, and monitor their fitness progress. Features include workout tracking, nutrition planning, and progress monitoring.",
    tags: [
      {
        name: "android",
        color: "green-text-gradient",
      },
      {
        name: "java",
        color: "blue-text-gradient",
      },
      {
        name: "sqlite",
        color: "pink-text-gradient",
      },
    ],
    image: mobile,
    source_code_link: "https://github.com/",
  },
  {
    name: "3D Portfolio",
    description:
      "An interactive and modern portfolio website built using React.js and Three.js. Features 3D animations, responsive design, and dynamic content rendering. Showcases projects and skills in an engaging way.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: web,
    source_code_link: "https://github.com/",
  }
];