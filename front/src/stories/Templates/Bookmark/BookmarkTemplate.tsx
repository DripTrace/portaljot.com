// import ProfilePage from "@/app/ProfilePage/ProfilePage";
import { Bookmark } from "@/lib/utils/schema";
import styles from "./ProfileTemplate.module.css";

const Bookmarkemplate: React.FC<{ bookmarks: Bookmark[] }> = ({
    bookmarks,
}) => {
    return (
        <div className={styles.container}>
            <nav></nav>
        </div>
    );
};

export default Bookmarkemplate;
