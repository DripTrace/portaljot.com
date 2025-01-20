import Image from "next/image";

const AMHHomePage = () => {
    return (
        <>
            <div className="content content--left">
                <h3 className="meta">Service 1</h3>
                <h2 className="type" data-expand-1>
                    We believe in
                    <br />
                    breaking barriers <br />
                    to{" "}
                    <span className="type__expand type__expand--inline type__expand--reveal">
                        <span className="type__expand-img">
                            {/* <span
								className="type__expand-img-inner"
								style={{
									backgroundImage: "url(/access-mentalhealth/images/img0.jpg)",
								}}
							></span> */}
                            <Image
                                src="/access-mentalhealth/images/img0.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />
                        </span>
                        <span className="anim skewed">mental health care.</span>
                    </span>
                </h2>
                <p className="block">
                    At Access Mental Healthcare, we utilize innovative
                    technology to provide accessible mental health services to
                    everyone. Our platform connects you with licensed
                    professionals, offering support and resources wherever you
                    are.
                </p>
            </div>
            <div className="content content--center">
                <h3 className="meta">Service 2</h3>
                <h2 className="type" data-expand-2>
                    Your journey to
                    <br />
                    wellness starts
                    <br />
                    <span className="type__expand type__expand--reveal type__expand--center">
                        <span className="aright">here </span>
                        <span className="type__expand-img">
                            {/* <span
								className="type__expand-img-inner"
								style={{
									backgroundImage: "url(/access-mentalhealth/images/img1.jpg)",
								}}
							></span> */}
                            <Image
                                src="/access-mentalhealth/images/img1.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />
                        </span>
                        <span className="anim skewed">and now.</span>
                    </span>
                    <br />
                    Embrace the support.
                </h2>
                <p className="block">
                    Our interactive and informational tools empower you to take
                    control of your mental health. With telehealth services and
                    personalized care plans, we're making mental wellness more
                    achievable than ever before.
                </p>
            </div>
            {/* <div className="content content--line">
                <h3 className="meta">Service 3</h3>
                <h2 className="type" data-expand-5>
                    Join our community
                    <br />
                    and
                    <span className="type__expand type__expand--mini">
                        <span className="type__expand-img type__expand-img--tiny">
                            <Image
                                src="/access-mentalhealth/images/img6.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    share your journey,
                    <br />
                    because together we
                    <br />
                    can make mental health
                    <br />
                    <span className="type__expand type__expand--mini">
                        <span className="type__expand-img type__expand-img--tiny">
                            <Image
                                src="/access-mentalhealth/images/img7.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    care accessible
                    <span className="type__expand type__expand--mini">
                        <span className="type__expand-img type__expand-img--tiny">
                            <Image
                                src="/access-mentalhealth/images/img8.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    <br />
                    to all.
                    <span className="type__expand type__expand--mini">
                        <span className="type__expand-img type__expand-img--tiny">
                            <Image
                                src="/access-mentalhealth/images/img9.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    <br />
                    <br />
                    <br />
                    By fostering a supportive community, we aim to break the
                    stigma surrounding mental health. Share experiences, find
                    encouragement, and connect with others who understand your
                    journey.
                </h2>
                <p className="block aleft">
                    Our goal is to help you understand and navigate the
                    complexities of mental health. Through educational programs
                    and expert guidance, we empower you to take control of your
                    mental health, arming you with the knowledge and tools
                    needed to thrive.
                </p>
            </div> */}
            <div className="content content--right">
                <h3 className="meta">Service 3</h3>
                <h2 className="type" data-expand-3>
                    Connect with
                    <br />
                    professionals who
                    <br />
                    <span className="type__expand type__expand--full">
                        <span className="type__expand-img">
                            <Image
                                src="/access-mentalhealth/images/img2.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    care
                    <br />
                    about your well-being.
                </h2>
                <p className="block">
                    Our network of compassionate mental health experts is here
                    to support you. We provide a safe and confidential
                    environment where you can explore your feelings and work
                    towards healing.
                </p>
            </div>
            <div className="content content--justify lg:relative lg:top-[15rem]">
                <h3 className="meta">Service 4</h3>
                <h2 className="type" data-expand-4>
                    Discover tools
                    <br />
                    to manage
                    <span className="type__expand type__expand--stack">
                        {/* <span className="anim rotated">stress</span> */}
                        <span className="anim">stress</span>
                        <span className="type__expand-img type__expand-img--small">
                            {/* <span
								className="type__expand-img-inner"
								style={{
									backgroundImage: "url(/access-mentalhealth/images/img3.jpg)",
								}}
							></span> */}
                            <Image
                                src="/access-mentalhealth/images/img3.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    and
                    <span className="type__expand type__expand--stack">
                        {/* <span className="anim rotated">anxiety</span> */}
                        <span className="anim">anxiety</span>
                        <span className="type__expand-img type__expand-img--small">
                            {/* <span
								className="type__expand-img-inner"
								style={{
									backgroundImage: "url(/access-mentalhealth/images/img4.jpg)",
								}}
							></span> */}
                            <Image
                                src="/access-mentalhealth/images/img4.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    <br />
                    through our interactive
                    <br />
                    resources and support.
                    <span className="type__expand type__expand--stack md:relative md:left-[60rem] lg:bottom-[30rem]">
                        <span className="type__expand-img type__expand-img--small">
                            {/* <span
								className="type__expand-img-inner"
								style={{
									backgroundImage: "url(/access-mentalhealth/images/img5.jpg)",
								}}
							></span> */}
                            <Image
                                src="/access-mentalhealth/images/img5.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                        <span className="anim rotated">mental health</span>
                        {/* <span className="anim rotated">mind</span> */}
                    </span>
                    {/* is an ongoing journey. */}
                </h2>
                <p className="block aright">
                    We offer a variety of educational materials and self-help
                    programs designed to assist you in understanding and
                    managing your mental health. Embrace a journey towards a
                    more balanced and fulfilling life.
                </p>
            </div>
            <div className="content content--line">
                <h3 className="meta">Service 5</h3>
                <h2 className="type" data-expand-5>
                    Join our community
                    <br />
                    and
                    <span className="type__expand type__expand--mini">
                        <span className="type__expand-img type__expand-img--tiny">
                            <Image
                                src="/access-mentalhealth/images/img6.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    share your journey,
                    <br />
                    because together we
                    <br />
                    can make mental health
                    <br />
                    <span className="type__expand type__expand--mini">
                        <span className="type__expand-img type__expand-img--tiny">
                            <Image
                                src="/access-mentalhealth/images/img7.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    care accessible
                    <span className="type__expand type__expand--mini">
                        <span className="type__expand-img type__expand-img--tiny">
                            <Image
                                src="/access-mentalhealth/images/img8.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    <br />
                    to all.
                    <span className="type__expand type__expand--mini">
                        <span className="type__expand-img type__expand-img--tiny">
                            <Image
                                src="/access-mentalhealth/images/img9.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    <br />
                    <br />
                    <br />
                    By fostering a supportive community, we aim to break the
                    stigma surrounding mental health. Share experiences, find
                    encouragement, and connect with others who understand your
                    journey.
                </h2>
                <p className="block aleft">
                    Our goal is to help you understand and navigate the
                    complexities of mental health. Through educational programs
                    and expert guidance, we empower you to take control of your
                    mental health, arming you with the knowledge and tools
                    needed to thrive.
                </p>
            </div>
            {/* <div className="content--bottom content--right">
                <h3 className="meta">Service 5</h3>
                <h2 className="type" data-expand-3>
                    Connect with
                    <br />
                    professionals who
                    <br />
                    <span className="type__expand type__expand--full">
                        <span className="type__expand-img">
                            <Image
                                src="/access-mentalhealth/images/img2.jpg"
                                alt=""
                                className="type__expand-img-inner"
                                height={720}
                                width={1080}
                            />{" "}
                        </span>
                    </span>
                    care
                    <br />
                    about your well-being.
                </h2>
                <p className="block">
                    Our network of compassionate mental health experts is here
                    to support you. We provide a safe and confidential
                    environment where you can explore your feelings and work
                    towards healing.
                </p>
            </div> */}
        </>
    );
};

export default AMHHomePage;
