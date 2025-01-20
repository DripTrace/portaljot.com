"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const SingleComponent: React.FC = () => {
    function toggleMenu() {
        const singleNavigation = document.querySelector(".single-navigation");
        const singleMain = document.querySelector(".single-main");
        singleNavigation?.classList.remove("single-active");
        singleMain?.classList.remove("single-active");
    }

    useEffect(() => {
        const singleToggle = document.querySelector(".single-toggle");
        const singleTopbar = document.querySelector(".single-topbar");
        const singleNavigation = document.querySelector(".single-navigation");
        const singleMain = document.querySelector(".single-main");
        const singleThemeSwitch = document.querySelector(".singleThemeSwitch");
        const singleBody = document.body;

        singleToggle?.addEventListener("click", () => {
            singleTopbar?.classList.toggle("single-active");
            singleNavigation?.classList.toggle("single-active");
            singleMain?.classList.toggle("single-active");
        });

        singleThemeSwitch?.addEventListener("click", () => {
            singleBody?.classList.toggle("single-dark");
        });

        return () => {
            singleToggle?.removeEventListener("click", () => {});
            singleThemeSwitch?.removeEventListener("click", () => {});
        };
    }, []);

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const [buttonText, setButtonText] = useState("Send");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const handleValidation = () => {
        let tempErrors: Record<string, boolean> = {};
        let isValid = true;

        if (fullname.length <= 0) {
            tempErrors["fullname"] = true;
            isValid = false;
        }
        if (email.length <= 0) {
            tempErrors["email"] = true;
            isValid = false;
        }
        if (subject.length <= 0) {
            tempErrors["subject"] = true;
            isValid = false;
        }
        if (message.length <= 0) {
            tempErrors["message"] = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        console.log("errors", errors);
        return isValid;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let isValidForm = handleValidation();

        if (isValidForm) {
            console.log("sending: ", fullname, email, subject, message);
            setButtonText("Sending");
            const res = await fetch("/api/single/send", {
                body: JSON.stringify({
                    email: email,
                    fullname: fullname,
                    subject: subject,
                    message: message,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            const { error } = await res.json();
            if (error) {
                console.log(error);
                setShowSuccessMessage(false);
                setShowFailureMessage(true);
                setButtonText("Send");

                setFullname("");
                setEmail("");
                setMessage("");
                setSubject("");
                return;
            }
            setShowSuccessMessage(true);
            setShowFailureMessage(false);
            setButtonText("Send");
            setFullname("");
            setEmail("");
            setMessage("");
            setSubject("");
        }

        console.log(fullname, email, subject, message);
    };

    // const [isDarkMode, setIsDarkMode] = useState(false);

    // function toggleMenu() {
    //     const singleNavigation = document.querySelector(".single-navigation");
    //     const singleMain = document.querySelector(".single-main");
    //     singleNavigation?.classList.toggle("single-active");
    //     singleMain?.classList.toggle("single-active");
    // }

    // useEffect(() => {
    //     const singleToggle = document.querySelector(".single-toggle");
    //     const singleTopbar = document.querySelector(".single-topbar");
    //     const singleNavigation = document.querySelector(".single-navigation");
    //     const singleMain = document.querySelector(".single-main");
    //     const singleThemeSwitch = document.querySelector(".singleThemeSwitch");
    //     const singleBody = document.body;

    //     singleToggle?.addEventListener("click", toggleMenu);

    //     singleThemeSwitch?.addEventListener("click", () => {
    //         singleBody?.classList.toggle("single-dark");
    //         setIsDarkMode(!isDarkMode);
    //     });

    //     // Smooth scrolling
    //     document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    //         anchor.addEventListener(
    //             "click",
    //             function (this: HTMLAnchorElement, e: Event) {
    //                 e.preventDefault();
    //                 const href = this.getAttribute("href");
    //                 const targetId = href?.substring(1);
    //                 const targetElement = document.getElementById(
    //                     targetId || ""
    //                 );
    //                 if (targetElement) {
    //                     targetElement.scrollIntoView({ behavior: "smooth" });
    //                 }
    //             }
    //         );
    //     });

    //     return () => {
    //         singleToggle?.removeEventListener("click", toggleMenu);
    //         singleThemeSwitch?.removeEventListener("click", () => {});
    //     };
    // }, [isDarkMode]);

    // const [fullname, setFullname] = useState("");
    // const [email, setEmail] = useState("");
    // const [subject, setSubject] = useState("");
    // const [message, setMessage] = useState("");

    // const [errors, setErrors] = useState<Record<string, boolean>>({});

    // const [buttonText, setButtonText] = useState("Send");

    // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // const [showFailureMessage, setShowFailureMessage] = useState(false);

    // const handleValidation = () => {
    //     let tempErrors: Record<string, boolean> = {};
    //     let isValid = true;

    //     if (fullname.length <= 0) {
    //         tempErrors["fullname"] = true;
    //         isValid = false;
    //     }
    //     if (email.length <= 0) {
    //         tempErrors["email"] = true;
    //         isValid = false;
    //     }
    //     if (subject.length <= 0) {
    //         tempErrors["subject"] = true;
    //         isValid = false;
    //     }
    //     if (message.length <= 0) {
    //         tempErrors["message"] = true;
    //         isValid = false;
    //     }

    //     setErrors({ ...tempErrors });
    //     console.log("errors", errors);
    //     return isValid;
    // };

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     let isValidForm = handleValidation();

    //     if (isValidForm) {
    //         console.log("sending: ", fullname, email, subject, message);
    //         setButtonText("Sending");
    //         const res = await fetch("/api/single/send", {
    //             body: JSON.stringify({
    //                 email: email,
    //                 fullname: fullname,
    //                 subject: subject,
    //                 message: message,
    //             }),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             method: "POST",
    //         });

    //         const { error } = await res.json();
    //         if (error) {
    //             console.log(error);
    //             setShowSuccessMessage(false);
    //             setShowFailureMessage(true);
    //             setButtonText("Send");

    //             setFullname("");
    //             setEmail("");
    //             setMessage("");
    //             setSubject("");
    //             return;
    //         }
    //         setShowSuccessMessage(true);
    //         setShowFailureMessage(false);
    //         setButtonText("Send");
    //         setFullname("");
    //         setEmail("");
    //         setMessage("");
    //         setSubject("");
    //     }

    //     console.log(fullname, email, subject, message);
    // };

    return (
        <>
            <div className="single-body">
                <div className="single-navigation">
                    <ul>
                        <li>
                            <a href="#single-banner" onClick={toggleMenu}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#single-about" onClick={toggleMenu}>
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#single-projects" onClick={toggleMenu}>
                                Projects
                            </a>
                        </li>
                        <li>
                            <a href="#single-contact" onClick={toggleMenu}>
                                Contact
                            </a>
                        </li>
                    </ul>
                    <div className="singleThemeSwitch"></div>
                </div>

                <div className="single-main">
                    <div className="single-topbar">
                        <a href="#single" className="single-logo flex-nowrap">
                            rPalm's Portfolio
                        </a>
                        <div className="single-toggle">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </div>
                    </div>

                    <section
                        className="single-banner single-section"
                        id="single-banner"
                    >
                        <div className="single-content">
                            <div className="imgBx">
                                <Image
                                    src="/single/user.jpeg"
                                    alt="User"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <h3 className="single-h3">Russell Palma</h3>
                            <p className="single-p">
                                I'm a creative Full Stack Developer.
                            </p>
                            <Link
                                className="single-btn"
                                href="/single/single-resume"
                            >
                                Cover Letter
                            </Link>

                            <ul className="socialMedia">
                                <li>
                                    <Link href="https://www.facebook.com/PinoyWakeboarder">
                                        <i
                                            className="fa fa-facebook"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.instagram.com/rpalmpinoy/">
                                        <i
                                            className="fa fa-instagram"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.linkedin.com/in/russell-palma-6b9700b9/">
                                        <i
                                            className="fa fa-linkedin"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://twitter.com/rPalmPinoy">
                                        <i
                                            className="fa fa-twitter"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section
                        className="single-about single-adjust single-section"
                        id="single-about"
                    >
                        <div className="single-title">
                            <h2>About Me</h2>
                        </div>
                        <div className="single-content">
                            <div className="textBox">
                                <p className="p-4">
                                    Hello 👋🏾, my name is Russell Brian Fulache
                                    Dugaduga Jale (pernounced "hall-ee") Palma.
                                    I have a burning passion for science,
                                    technology, and exploration of both the
                                    human mind and of the universe. At the
                                    beginning of my academic career I dove into
                                    the world of computer engineering and
                                    discovered my love for learning about the
                                    physics of electronics, but initially didn't
                                    realize how much I wanted to know more about
                                    the software side of my degree. After a
                                    couple years of college I found myself
                                    looking more into web technologies. I was
                                    very fascinated with this part of the
                                    engineering world and jumped at the
                                    opportunity of becoming a full stack
                                    developer. Some of my stretch goals include
                                    extending my reach towards software design
                                    and implementing machine learning into my
                                    workflow. Eventually, I would like to
                                    continue my education, transfer the
                                    knowledge I gain from freelancing into the
                                    world of Quantum Computing, and tackle
                                    humanity's most difficult problems.
                                </p>
                            </div>
                            <div className="imgBc">
                                <Image
                                    src="/single/me.jpg"
                                    alt="About me"
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>
                    </section>

                    <section
                        className="single-projects single-adjust single-section"
                        id="single-projects"
                    >
                        <div className="single-title">
                            <h2>Recent Work</h2>
                            <p className="single-p">
                                Checkout some of the clones that I've built out
                                (click links to redirect).
                            </p>
                        </div>
                        <div className="single-content">
                            <Link href="https://rpalm-spotify-clone-next.vercel.app/">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            src="https://links.papareact.com/9xl"
                                            alt="Spotify"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">Spotify</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://rpalm-netflix-clone--react.web.app/">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo-700x394.png"
                                            alt="Netflix"
                                            width={100}
                                            height={56}
                                        />
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">Netflix</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://amazon-clone-react-kappa.vercel.app/">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            // src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
                                            src="https://assets.turbologo.com/blog/en/2019/10/19084944/youtube-logo-illustration.jpg"
                                            alt="Amazon"
                                            width={100}
                                            height={56}
                                        />
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">Amazon</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://rpalm-yt-clone--react.web.app/">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            src="https://assets.turbologo.com/blog/en/2019/10/19084944/youtube-logo-illustration.jpg"
                                            alt="YouTube"
                                            width={100}
                                            height={56}
                                        />
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">YouTube</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                href="https://huluclone-react.vercel.app/"
                                passHref
                            >
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="hulu"
                                            src="https://assetshuluimcom-a.akamaihd.net/h3o/facebook_share_thumb_default_hulu.jpg"
                                            width={100}
                                            height={56}
                                        />
                                        HU
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">Hulu</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                href="https://whats-app-clone-react.vercel.app/"
                                passHref
                            >
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="fill"
                                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                            width={100}
                                            height={56}
                                        />
                                        WA
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">WhatsApp</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                href="https://russellportfolio.netlify.app"
                                passHref
                            >
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="sanity"
                                            src="https://repository-images.githubusercontent.com/252413723/e6f28180-8882-11ea-9e76-78d72dfa2af0"
                                            width={100}
                                            height={56}
                                        />
                                        SA
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">
                                            Sanity Blog CMS
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                className="cursor-pointer"
                                href="https://ecstatic-leavitt-a2e426.netlify.app"
                                passHref
                            >
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="startup"
                                            src="https://ecstatic-leavitt-a2e426.netlify.app/_next/static/images/logo-dc45e16445beb0dd598e41ae68c69c61.svg"
                                            width={100}
                                            height={56}
                                        />
                                        SL
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">
                                            Startup Landing
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://nervous-ramanujan-132263.netlify.app">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="dolla"
                                            src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
                                            width={100}
                                            height={56}
                                        />
                                        DO
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">Dolla</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://fathomless-fjord-48768.herokuapp.com">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="musiccontroller"
                                            src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
                                            width={100}
                                            height={56}
                                        />
                                        MC
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">
                                            Music Controller
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://fathomless-temple-25078.herokuapp.com">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="rpalmslist"
                                            src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
                                            width={100}
                                            height={56}
                                        />
                                        RL
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">
                                            rPalm's List
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://greenspot-hub-productions.vercel.app">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="greenspothubproductions"
                                            src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
                                            width={100}
                                            height={56}
                                        />
                                        GH
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">
                                            Greenspot Hub Productions
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://obinsun.vercel.app">
                                <div className="workBx">
                                    <div className="imgBx">
                                        <Image
                                            className="object-contain"
                                            alt="obinsun"
                                            src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
                                            width={100}
                                            height={56}
                                        />
                                        OB
                                    </div>
                                    <div className="textBx">
                                        <h3 className="single-h3">Obinsun</h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </section>

                    <section
                        className="single-contact single-adjust single-section"
                        id="single-contact"
                    >
                        <div className="single-title">
                            <h2>Let's Say Hi</h2>
                            <p className="single-p">
                                Feel free to contact me. Just leave your details
                                and I'll get back to you as soon as I can.
                            </p>
                        </div>
                        <form className="contactForm" onSubmit={handleSubmit}>
                            <div className="single-row">
                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setFullname(e.target.value);
                                    }}
                                    name="fullname"
                                    placeholder="Enter Your Full Name"
                                />
                                {errors?.fullname && (
                                    <span className="error">
                                        Full name is required
                                    </span>
                                )}
                            </div>
                            <div className="single-row">
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Enter Your E-Mail"
                                />
                                {errors?.email && (
                                    <span className="error">
                                        Email is required
                                    </span>
                                )}
                                <input
                                    type="text"
                                    name="subject"
                                    value={subject}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setSubject(e.target.value);
                                    }}
                                    placeholder="Subject"
                                />
                                {errors?.subject && (
                                    <span className="error">
                                        Subject is required
                                    </span>
                                )}
                            </div>
                            <div className="row2">
                                <textarea
                                    name="message"
                                    value={message}
                                    onChange={(
                                        e: ChangeEvent<HTMLTextAreaElement>
                                    ) => {
                                        setMessage(e.target.value);
                                    }}
                                    placeholder="Type Your Message Here"
                                />
                                {errors?.message && (
                                    <span className="error">
                                        Message is required
                                    </span>
                                )}
                            </div>
                            <div className="row2">
                                <input type="submit" value={buttonText} />
                            </div>
                        </form>
                        {showSuccessMessage && (
                            <p className="success-message">
                                Thank you! Your message has been sent.
                            </p>
                        )}
                        {showFailureMessage && (
                            <p className="error-message">
                                Oops! Something went wrong. Please try again.
                            </p>
                        )}
                    </section>

                    <div className="single-copyright">
                        <p className="single-p">
                            Copyright © 2024 PalmaView LLC. All Rights
                            Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleComponent;

// "use client";

// import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import Link from "next/link";
// import Image from "next/image";

// const SingleComponent: React.FC = () => {
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     function toggleMenu() {
//         const singleNavigation = document.querySelector(".single-navigation");
//         const singleMain = document.querySelector(".single-main");
//         singleNavigation?.classList.toggle("single-active");
//         singleMain?.classList.toggle("single-active");
//     }

//     useEffect(() => {
//         const singleToggle = document.querySelector(".single-toggle");
//         const singleTopbar = document.querySelector(".single-topbar");
//         const singleNavigation = document.querySelector(".single-navigation");
//         const singleMain = document.querySelector(".single-main");
//         const singleThemeSwitch = document.querySelector(".singleThemeSwitch");
//         const singleBody = document.body;

//         singleToggle?.addEventListener("click", toggleMenu);

//         singleThemeSwitch?.addEventListener("click", () => {
//             singleBody?.classList.toggle("single-dark");
//             setIsDarkMode(!isDarkMode);
//         });

//         // Smooth scrolling
//         document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//             anchor.addEventListener(
//                 "click",
//                 function (this: HTMLAnchorElement, e: Event) {
//                     e.preventDefault();
//                     const href = this.getAttribute("href");
//                     const targetId = href?.substring(1);
//                     const targetElement = document.getElementById(
//                         targetId || ""
//                     );
//                     if (targetElement) {
//                         targetElement.scrollIntoView({ behavior: "smooth" });
//                     }
//                 }
//             );
//         });

//         return () => {
//             singleToggle?.removeEventListener("click", toggleMenu);
//             singleThemeSwitch?.removeEventListener("click", () => {});
//         };
//     }, [isDarkMode]);

//     const [fullname, setFullname] = useState("");
//     const [email, setEmail] = useState("");
//     const [subject, setSubject] = useState("");
//     const [message, setMessage] = useState("");

//     const [errors, setErrors] = useState<Record<string, boolean>>({});

//     const [buttonText, setButtonText] = useState("Send");

//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//     const [showFailureMessage, setShowFailureMessage] = useState(false);

//     const handleValidation = () => {
//         let tempErrors: Record<string, boolean> = {};
//         let isValid = true;

//         if (fullname.length <= 0) {
//             tempErrors["fullname"] = true;
//             isValid = false;
//         }
//         if (email.length <= 0) {
//             tempErrors["email"] = true;
//             isValid = false;
//         }
//         if (subject.length <= 0) {
//             tempErrors["subject"] = true;
//             isValid = false;
//         }
//         if (message.length <= 0) {
//             tempErrors["message"] = true;
//             isValid = false;
//         }

//         setErrors({ ...tempErrors });
//         console.log("errors", errors);
//         return isValid;
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         let isValidForm = handleValidation();

//         if (isValidForm) {
//             console.log("sending: ", fullname, email, subject, message);
//             setButtonText("Sending");
//             const res = await fetch("/api/single/send", {
//                 body: JSON.stringify({
//                     email: email,
//                     fullname: fullname,
//                     subject: subject,
//                     message: message,
//                 }),
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 method: "POST",
//             });

//             const { error } = await res.json();
//             if (error) {
//                 console.log(error);
//                 setShowSuccessMessage(false);
//                 setShowFailureMessage(true);
//                 setButtonText("Send");

//                 setFullname("");
//                 setEmail("");
//                 setMessage("");
//                 setSubject("");
//                 return;
//             }
//             setShowSuccessMessage(true);
//             setShowFailureMessage(false);
//             setButtonText("Send");
//             setFullname("");
//             setEmail("");
//             setMessage("");
//             setSubject("");
//         }

//         console.log(fullname, email, subject, message);
//     };

//     return (
//         <>
//             <div className="single-body">
//                 <div className="single-navigation">
//                     <ul>
//                         <li>
//                             <a href="#single-banner" onClick={toggleMenu}>
//                                 Home
//                             </a>
//                         </li>
//                         <li>
//                             <a href="#single-about" onClick={toggleMenu}>
//                                 About
//                             </a>
//                         </li>
//                         <li>
//                             <a href="#single-projects" onClick={toggleMenu}>
//                                 Projects
//                             </a>
//                         </li>
//                         <li>
//                             <a href="#single-contact" onClick={toggleMenu}>
//                                 Contact
//                             </a>
//                         </li>
//                     </ul>
//                     <div
//                         className={`singleThemeSwitch ${isDarkMode ? "single-dark" : ""}`}
//                     ></div>
//                 </div>

//                 <div className="single-main">
//                     <div className="single-topbar">
//                         <a href="#single" className="single-logo flex-nowrap">
//                             rPalm's Portfolio
//                         </a>
//                         <div className="single-toggle">
//                             <i className="fa fa-bars" aria-hidden="true"></i>
//                         </div>
//                     </div>

//                     <section
//                         className="single-banner single-section"
//                         id="single-banner"
//                     >
//                         <div className="single-content">
//                             <div className="imgBx">
//                                 <Image
//                                     src="/single/user.jpeg"
//                                     alt="User"
//                                     width={200}
//                                     height={200}
//                                 />
//                             </div>
//                             <h3 className="single-h3">Russell Palma</h3>
//                             <p className="single-p">
//                                 I'm a creative Full Stack Developer.
//                             </p>
//                             <Link
//                                 className="single-btn"
//                                 href="/single/single-resume"
//                             >
//                                 Cover Letter
//                             </Link>

//                             <ul className="socialMedia">
//                                 <li>
//                                     <Link href="https://www.facebook.com/PinoyWakeboarder">
//                                         <i
//                                             className="fa fa-facebook"
//                                             aria-hidden="true"
//                                         ></i>
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link href="https://www.instagram.com/rpalmpinoy/">
//                                         <i
//                                             className="fa fa-instagram"
//                                             aria-hidden="true"
//                                         ></i>
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link href="https://www.linkedin.com/in/russell-palma-6b9700b9/">
//                                         <i
//                                             className="fa fa-linkedin"
//                                             aria-hidden="true"
//                                         ></i>
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link href="https://twitter.com/rPalmPinoy">
//                                         <i
//                                             className="fa fa-twitter"
//                                             aria-hidden="true"
//                                         ></i>
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </section>

//                     <section
//                         className="single-about single-adjust single-section"
//                         id="single-about"
//                     >
//                         <div className="single-title">
//                             <h2>About Me</h2>
//                         </div>
//                         <div className="single-content">
//                             <div className="textBox">
//                                 <p className="p-4">
//                                     Hello 👋🏾, my name is Russell Brian Fulache
//                                     Dugaduga Jale (pernounced "hall-ee") Palma.
//                                     I have a burning passion for science,
//                                     technology, and exploration of both the
//                                     human mind and of the universe. At the
//                                     beginning of my academic career I dove into
//                                     the world of computer engineering and
//                                     discovered my love for learning about the
//                                     physics of electronics, but initially didn't
//                                     realize how much I wanted to know more about
//                                     the software side of my degree. After a
//                                     couple years of college I found myself
//                                     looking more into web technologies. I was
//                                     very fascinated with this part of the
//                                     engineering world and jumped at the
//                                     opportunity of becoming a full stack
//                                     developer. Some of my stretch goals include
//                                     extending my reach towards software design
//                                     and implementing machine learning into my
//                                     workflow. Eventually, I would like to
//                                     continue my education, transfer the
//                                     knowledge I gain from freelancing into the
//                                     world of Quantum Computing, and tackle
//                                     humanity's most difficult problems.
//                                 </p>
//                             </div>
//                             <div className="imgBc">
//                                 <Image
//                                     src="/single/me.jpg"
//                                     alt="About me"
//                                     width={300}
//                                     height={300}
//                                 />
//                             </div>
//                         </div>
//                     </section>

//                     <section
//                         className="single-projects single-adjust single-section"
//                         id="single-projects"
//                     >
//                         <div className="single-title">
//                             <h2>Recent Work</h2>
//                             <p className="single-p">
//                                 Checkout some of the clones that I've built out
//                                 (click links to redirect).
//                             </p>
//                         </div>
//                         <div className="single-content">
//                             <Link href="https://rpalm-spotify-clone-next.vercel.app/">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             src="https://links.papareact.com/9xl"
//                                             alt="Spotify"
//                                             width={100}
//                                             height={100}
//                                         />
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">Spotify</h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link href="https://rpalm-netflix-clone--react.web.app/">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo-700x394.png"
//                                             alt="Netflix"
//                                             width={100}
//                                             height={56}
//                                         />
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">Netflix</h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link href="https://amazon-clone-react-kappa.vercel.app/">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             src="https://assets.turbologo.com/blog/en/2019/10/19084944/youtube-logo-illustration.jpg"
//                                             alt="Amazon"
//                                             width={100}
//                                             height={56}
//                                         />
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">Amazon</h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link href="https://rpalm-yt-clone--react.web.app/">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             src="https://assets.turbologo.com/blog/en/2019/10/19084944/youtube-logo-illustration.jpg"
//                                             alt="YouTube"
//                                             width={100}
//                                             height={56}
//                                         />
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">YouTube</h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link
//                                 href="https://huluclone-react.vercel.app/"
//                                 passHref
//                             >
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="hulu"
//                                             src="https://assetshuluimcom-a.akamaihd.net/h3o/facebook_share_thumb_default_hulu.jpg"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         HU
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">Hulu</h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link
//                                 href="https://whats-app-clone-react.vercel.app/"
//                                 passHref
//                             >
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="fill"
//                                             src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         WA
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">WhatsApp</h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link
//                                 href="https://russellportfolio.netlify.app"
//                                 passHref
//                             >
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="sanity"
//                                             src="https://repository-images.githubusercontent.com/252413723/e6f28180-8882-11ea-9e76-78d72dfa2af0"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         SA
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">
//                                             Sanity Blog CMS
//                                         </h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link
//                                 className="cursor-pointer"
//                                 href="https://ecstatic-leavitt-a2e426.netlify.app"
//                                 passHref
//                             >
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="startup"
//                                             src="https://ecstatic-leavitt-a2e426.netlify.app/_next/static/images/logo-dc45e16445beb0dd598e41ae68c69c61.svg"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         SL
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">
//                                             Startup Landing
//                                         </h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link href="https://nervous-ramanujan-132263.netlify.app">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="dolla"
//                                             src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         DO
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">Dolla</h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link href="https://fathomless-fjord-48768.herokuapp.com">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="musiccontroller"
//                                             src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         MC
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">
//                                             Music Controller
//                                         </h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link href="https://fathomless-temple-25078.herokuapp.com">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="rpalmslist"
//                                             src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         RL
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">
//                                             rPalm's List
//                                         </h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link href="https://greenspot-hub-productions.vercel.app">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="greenspothubproductions"
//                                             src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         GH
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">
//                                             Greenspot Hub Productions
//                                         </h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link href="https://obinsun.vercel.app">
//                                 <div className="workBx">
//                                     <div className="imgBx">
//                                         <Image
//                                             className="object-contain"
//                                             alt="obinsun"
//                                             src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
//                                             width={100}
//                                             height={56}
//                                         />
//                                         OB
//                                     </div>
//                                     <div className="textBx">
//                                         <h3 className="single-h3">Obinsun</h3>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     </section>

//                     <section
//                         className="single-contact single-adjust single-section"
//                         id="single-contact"
//                     >
//                         <div className="single-title">
//                             <h2>Let's Say Hi</h2>
//                             <p className="single-p">
//                                 Feel free to contact me. Just leave your details
//                                 and I'll get back to you as soon as I can.
//                             </p>
//                         </div>
//                         <form className="contactForm" onSubmit={handleSubmit}>
//                             <div className="single-row">
//                                 <input
//                                     type="text"
//                                     value={fullname}
//                                     onChange={(
//                                         e: ChangeEvent<HTMLInputElement>
//                                     ) => {
//                                         setFullname(e.target.value);
//                                     }}
//                                     name="fullname"
//                                     placeholder="Enter Your Full Name"
//                                 />
//                                 {errors?.fullname && (
//                                     <span className="error">
//                                         Full name is required
//                                     </span>
//                                 )}
//                             </div>
//                             <div className="single-row">
//                                 <input
//                                     type="text"
//                                     name="email"
//                                     value={email}
//                                     onChange={(
//                                         e: ChangeEvent<HTMLInputElement>
//                                     ) => {
//                                         setEmail(e.target.value);
//                                     }}
//                                     placeholder="Enter Your E-Mail"
//                                 />
//                                 {errors?.email && (
//                                     <span className="error">
//                                         Email is required
//                                     </span>
//                                 )}
//                                 <input
//                                     type="text"
//                                     name="subject"
//                                     value={subject}
//                                     onChange={(
//                                         e: ChangeEvent<HTMLInputElement>
//                                     ) => {
//                                         setSubject(e.target.value);
//                                     }}
//                                     placeholder="Subject"
//                                 />
//                                 {errors?.subject && (
//                                     <span className="error">
//                                         Subject is required
//                                     </span>
//                                 )}
//                             </div>
//                             <div className="row2">
//                                 <textarea
//                                     name="message"
//                                     value={message}
//                                     onChange={(
//                                         e: ChangeEvent<HTMLTextAreaElement>
//                                     ) => {
//                                         setMessage(e.target.value);
//                                     }}
//                                     placeholder="Type Your Message Here"
//                                 />
//                                 {errors?.message && (
//                                     <span className="error">
//                                         Message is required
//                                     </span>
//                                 )}
//                             </div>
//                             <div className="row2">
//                                 <input type="submit" value={buttonText} />
//                             </div>
//                         </form>
//                         {showSuccessMessage && (
//                             <p className="success-message">
//                                 Thank you! Your message has been sent.
//                             </p>
//                         )}
//                         {showFailureMessage && (
//                             <p className="error-message">
//                                 Oops! Something went wrong. Please try again.
//                             </p>
//                         )}
//                     </section>

//                     <div className="single-copyright">
//                         <p className="single-p">
//                             Copyright © 2024 PalmaView LLC. All Rights
//                             Reserved.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SingleComponent;
