import Link from "next/link";

const ResumeComponent = () => {
    return (
        <>
            <div className="single-body">
                <Link className="mainWebsite" href="/single" passHref>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                    to main website
                </Link>

                <div className="container0">
                    <div className="left_Side">
                        <div className="profileText">
                            <div className="imgBx0">
                                <img src="single/me.jpg" />
                            </div>
                            <h2>
                                Russell Palma
                                <br />
                                <span>Full Stack Developer</span>
                            </h2>
                        </div>

                        <div className="contactInfo">
                            <h3 className="title0">Contact Info</h3>
                            <ul>
                                <li>
                                    <span className="single-icon">
                                        <i
                                            className="fa fa-phone"
                                            aria-hidden="true"
                                        ></i>
                                    </span>
                                    <span className="single-text">
                                        +1 909 289 5924
                                    </span>
                                </li>
                                <li>
                                    <span className="single-icon">
                                        <i
                                            className="fa fa-envelope-o"
                                            aria-hidden="true"
                                        ></i>
                                    </span>
                                    <span className="single-text">
                                        russellbrian@palmaview.com
                                    </span>
                                </li>
                                <li>
                                    <span className="single-icon">
                                        <i
                                            className="fa fa-globe"
                                            aria-hidden="true"
                                        ></i>
                                    </span>
                                    <span className="single-text">
                                        www.palmaview.com
                                    </span>
                                </li>
                                <li>
                                    <span className="single-icon">
                                        <i
                                            className="fa fa-link"
                                            aria-hidden="true"
                                        ></i>
                                    </span>
                                    <span className="single-text">
                                        https://www.linkedin.com/in/russell-palma-6b9700b9/
                                    </span>
                                </li>
                                <li>
                                    <span className="single-icon">
                                        <i
                                            className="fa fa-map-marker"
                                            aria-hidden="true"
                                        ></i>
                                    </span>
                                    <span className="single-text">
                                        Loma Linda, CA
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="contactInfo single-education">
                            <h3 className="title0">Education</h3>
                            <ul>
                                <li>
                                    <h5>2015 - 2021</h5>
                                    <h4>
                                        Bachelors of Science in Computer
                                        Engineering
                                    </h4>
                                    <h4>Walla Walla University</h4>
                                </li>
                            </ul>
                        </div>

                        <div className="contactInfo single-language">
                            <h3 className="title0">Languages</h3>
                            <ul>
                                <li>
                                    <span className="single-text">English</span>
                                    <span className="single-percent">
                                        <div style={{ width: "100%" }}></div>
                                    </span>
                                </li>
                                <li>
                                    <span className="single-text">Spanish</span>
                                    <span className="single-percent">
                                        <div style={{ width: "10%" }}></div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="right_Side">
                        <div className="single-about0">
                            <h2 className="title2">Profile</h2>
                            <p className="p">
                                Initially I went to school to study computer
                                engineer. I love physics, but wanted to dive
                                more into software. After a couple of years of
                                broadening my perspective I found myself
                                immersed into the world of web technologies.{" "}
                                <br />
                                <br />
                                Since then I picked up knowledge of some
                                in-demand frameworks. Now I'm currently
                                freelancing and building full stack webapps with
                                React.
                            </p>
                        </div>
                        <div className="single-about0">
                            <h2 className="title2">Experience</h2>
                            <div className="single-box">
                                <div className="year_company">
                                    <h5>2020 - 2021</h5>
                                    <h5>
                                        Loma Linda Psychiatric Medical Group
                                    </h5>
                                </div>
                                <div className="single-text">
                                    <h4>
                                        Information Technology Administrator
                                    </h4>
                                    <p className="p">
                                        Wrote scripts to automate office tasks
                                        and eventually went on to redesigning
                                        their website.
                                    </p>
                                </div>
                            </div>
                            <div className="single-box">
                                <div className="year_company">
                                    <h5>2021 - 2021</h5>
                                    <h5>Greenspot Hub Productions</h5>
                                </div>
                                <div className="single-text">
                                    <h4>Full Stack Developer</h4>
                                    <p className="p">
                                        I started off redesigning their main
                                        website from the ground up, but
                                        eventually went on to contract with them
                                        and design multiple websites for them.
                                    </p>
                                </div>
                            </div>
                            <div className="single-box">
                                <div className="year_company">
                                    <h5>2021 - Present</h5>
                                    <h5>PalmaView</h5>
                                </div>
                                <div className="single-text">
                                    <h4>Founder & CEO</h4>
                                    <p className="p">
                                        This is the company I made due to
                                        freelancing nature of my work.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="about0 single-skills">
                            <h2 className="title2">Professional skills</h2>
                            <div className="single-box">
                                <h4>HTML</h4>
                                <div className="single-percent">
                                    <div style={{ width: "95%" }}></div>
                                </div>
                            </div>
                            <div className="single-box">
                                <h4>CSS</h4>
                                <div className="single-percent">
                                    <div style={{ width: "85%" }}></div>
                                </div>
                            </div>
                            <div className="single-box">
                                <h4>JavaScript</h4>
                                <div className="single-percent">
                                    <div style={{ width: "75%" }}></div>
                                </div>
                            </div>
                            <div className="single-box">
                                <h4>React</h4>
                                <div className="single-percent">
                                    <div style={{ width: "80%" }}></div>
                                </div>
                            </div>
                            <div className="single-box">
                                <h4>Python</h4>
                                <div className="single-percent">
                                    <div style={{ width: "70%" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="about0 single-interests">
                            <h2 className="title2">Interests</h2>
                            <ul>
                                <li>
                                    <i
                                        className="fa fa-gamepad"
                                        aria-hidden="true"
                                    ></i>
                                    Gaming
                                </li>
                                <li>
                                    <i
                                        className="fa fa-snowflake-o"
                                        aria-hidden="true"
                                    ></i>
                                    Boarding
                                </li>
                                <li>
                                    <i
                                        className="fa fa-cutlery"
                                        aria-hidden="true"
                                    ></i>
                                    Cooking
                                </li>
                                <li>
                                    <i
                                        className="fa fa-music"
                                        aria-hidden="true"
                                    ></i>
                                    EDM
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeComponent;
