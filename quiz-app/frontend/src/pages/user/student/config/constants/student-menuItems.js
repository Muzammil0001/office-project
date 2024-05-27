import {
  MdDashboard,
  MdSettings,
  MdNotifications,
  MdBarChart,
} from "react-icons/md";
import { PiTrophyFill } from "react-icons/pi";
import { IoBook, IoDocumentText, IoChatboxEllipses } from "react-icons/io5";
import { ImBooks } from "react-icons/im";

const menuItems = [
  {
    icon: <MdDashboard />,
    label: "Dashboard",
    component: "dashboard",
  },
  {
    icon: <PiTrophyFill />,
    label: "Leaderboard & Progress",
    component: "leaderboard",
  },
  {
    icon: <IoBook />,
    label: "Courses",
    component: "courses",
  },
  {
    icon: <IoDocumentText />,
    label: "Quiz",
    component: "quiz",
  },
  {
    icon: <ImBooks />,
    label: "Study Material",
    component: "studyMaterial",
  },
  {
    icon: <IoChatboxEllipses />,
    label: "Chat",
    component: "chat",
  },
  {
    icon: <MdNotifications />,
    label: "Notifications",
    component: "notify",
  },
  {
    icon: <MdSettings />,
    label: "Settings",
    component: "", // Assuming settings has no dedicated component yet
  },
  {
    icon: <MdBarChart />,
    label: "Analytics",
    component: "", // Assuming analytics has no dedicated component yet
  },
];

export default menuItems;
