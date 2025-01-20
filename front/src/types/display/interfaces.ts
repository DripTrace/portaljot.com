export interface ClipProps {
    clipDisplayed: boolean;
    redirect: () => void;
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
