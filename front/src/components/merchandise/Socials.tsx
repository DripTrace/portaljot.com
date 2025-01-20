import {
    FaFacebook,
    FaTwitter,
    FaDiscord,
    FaLinkedin,
    FaTiktok,
    FaBitcoin,
    FaEthereum,
} from "react-icons/fa";
import { BsInstagram, BsReddit, BsYoutube, BsSnapchat } from "react-icons/bs";
// import {
//     SiGmail,
//     //   SiYahoo,
//     SiMicrosoftoutlook,
//     SiProtonmail,
//     SiVenmo,
//     SiPaypal,
//     SiBankofamerica,
//     SiChase,
//     SiDiscover,
//     SiAmericanexpress,
//     SiCashapp,
//     SiZelle,
// } from "react-icons/si";

const Socials = () => {
    return (
        <ul className="socials-list-container ">
            <li className="socials-icon-list-container">
                <a
                    className="socials-icon-transition social-glass-transition-delay"
                    href="#"
                >
                    <FaFacebook aria-hidden="true" />
                </a>
            </li>
            <li className="socials-icon-list-container">
                <a
                    className="socials-icon-transition social-glass-transition-delay"
                    href="#"
                >
                    <FaTwitter aria-hidden="true" />
                </a>
            </li>
            <li className="socials-icon-list-container">
                <a
                    className="socials-icon-transition social-glass-transition-delay"
                    href="#"
                >
                    <FaLinkedin aria-hidden="true" />
                </a>
            </li>
            <li className="socials-icon-list-container">
                <a
                    className="socials-icon-transition social-glass-transition-delay"
                    href="#"
                >
                    <BsInstagram aria-hidden="true" />
                </a>
            </li>
            <li className="socials-icon-list-container">
                <a
                    className="socials-icon-transition social-glass-transition-delay"
                    href="#"
                >
                    <BsSnapchat aria-hidden="true" />
                </a>
            </li>
        </ul>
    );
};

export default Socials;
