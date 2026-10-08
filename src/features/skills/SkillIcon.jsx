import {
    Code2,
    Database,
    Globe,
    Server,
    ShieldCheck,
    Brain,
    GitBranch,
    Container,
    Network,
    Cpu,
    LockKeyhole,
    Terminal,
    Activity,
    Gauge,
    Layers,
    FileCode2,
    Workflow,
    Radio,
    Cloud,
} from "lucide-react";

import {
    FaJava,
    FaPython,
    FaJs,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaDocker,
} from "react-icons/fa";

import {
    SiExpress,
    SiMongodb,
    SiMysql,
    SiTailwindcss,
    SiNginx,
    SiRedis,
    SiPrometheus,
    SiGrafana,
    SiSocketdotio,
    SiFlask,
    SiJsonwebtokens,
} from "react-icons/si";


const iconMap = {
    // Programming Languages
    javascript: FaJs,
    python: FaPython,
    java: FaJava,

    // Frontend
    html: Globe,
    css: Code2,
    react: FaReact,
    tailwind: SiTailwindcss,

    // Backend
    node: FaNodeJs,
    express: SiExpress,
    flask: SiFlask,
    api: Server,
    jwt: SiJsonwebtokens,
    websocket: Radio,
    socket: SiSocketdotio,

    // Databases
    mongodb: SiMongodb,
    mysql: SiMysql,
    sql: Database,

    // AI / ML
    rag: Brain,
    llm: Brain,
    stt: Radio,
    tts: Radio,
    ai: Brain,

    // DevOps & Tools
    git: FaGitAlt,
    github: FaGithub,
    docker: FaDocker,
    nginx: SiNginx,
    redis: SiRedis,
    cicd: Workflow,
    prometheus: SiPrometheus,
    grafana: SiGrafana,

    // Security
    owasp: ShieldCheck,
    authentication: LockKeyhole,
    authorization: ShieldCheck,
    validation: ShieldCheck,
    "rate-limit": Gauge,
    security: ShieldCheck,

    // Core Computer Science
    dsa: Code2,
    oop: Layers,
    dbms: Database,
    os: Cpu,
    network: Network,
    multithreading: Workflow,
};


// Fallback icon
const DefaultIcon = Terminal;


function SkillIcon({ name, size = 20, className = "" }) {
    const Icon = iconMap[name] || DefaultIcon;

    return (
        <Icon
            size={size}
            strokeWidth={1.8}
            className={className}
        />
    );
}


export default SkillIcon;