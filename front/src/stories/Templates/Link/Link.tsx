import { Link as LinkType } from "@/lib/utils/schema";

const Link: React.FC<{ link: LinkType }> = ({ link }) => {
    return (
        <div className="p-4 shadow-lg rounded bg-white hover:bg-gray-100 cursor-pointer">
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                {link.label}
            </a>
        </div>
    );
};

export default Link;
