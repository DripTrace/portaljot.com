import React from "react";

// Define a type for our icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Define a type for our lazy-loaded icon components
type LazyIconComponent = React.LazyExoticComponent<IconComponent>;

// Helper function to create lazy-loaded components
const createLazyIcon = (
    importFunc: () => Promise<{ default: IconComponent }>
): LazyIconComponent => React.lazy(importFunc);

const Home = createLazyIcon(() => import("@heroicons/react/outline/HomeIcon"));
const Camera = createLazyIcon(
    () => import("@heroicons/react/outline/CameraIcon")
);
const VideoCamera = createLazyIcon(
    () => import("@heroicons/react/outline/VideoCameraIcon")
);
const Pencil = createLazyIcon(
    () => import("@heroicons/react/outline/PencilIcon")
);
const Microphone = createLazyIcon(
    () => import("@heroicons/react/outline/MicrophoneIcon")
);
const Briefcase = createLazyIcon(
    () => import("@heroicons/react/outline/BriefcaseIcon")
);
const ShoppingCart = createLazyIcon(
    () => import("@heroicons/react/outline/ShoppingCartIcon")
);

interface NavItem {
    route: string;
    title: string;
    Icon: LazyIconComponent;
}

const navItems: NavItem[] = [
    { route: "/display/boogey/feed", title: "FEED", Icon: Home },
    { route: "/display/boogey/photos", title: "PHOTOS", Icon: Camera },
    { route: "/display/boogey/videos", title: "VIDEOS", Icon: VideoCamera },
    { route: "/display/boogey/music", title: "MUSIC", Icon: Microphone },
    { route: "/display/boogey/blog", title: "BLOG", Icon: Pencil },
    { route: "/display/boogey/shop", title: "SHOP", Icon: ShoppingCart },
    { route: "/display/boogey/connect", title: "CONNECT", Icon: Briefcase },
];

export default navItems;
