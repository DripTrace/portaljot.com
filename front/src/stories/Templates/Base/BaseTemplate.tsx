import styles from "./BaseTemplate.module.css";

export interface IBaseTemplate {
    baseTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ baseTextProp }) => {
    return <div className={`${styles.container}`}>{baseTextProp}</div>;
};

export default BaseTemplate;
