import styles from "./ProfileTemplate.module.css";

export interface IProfileTemplate {
    profileTextProp: string;
}

const ProfileTemplate: React.FC<IProfileTemplate> = ({ profileTextProp }) => {
    return (
        <div className={styles.container}>
            {/* // <div className='profile-layout'> */}
            {/* {profileTextProp} */}
            {/* <ProfilePage /> */}
        </div>
    );
};

export default ProfileTemplate;
