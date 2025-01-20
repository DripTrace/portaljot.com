import ContentComponent from "@/components/merchandise/ContentComponent";

const title = "Welcome, this is Obinsun 👋";
const subtitle =
    "You will fins a plethora of custom graphic designs attatched to high quality merchandise.";

export default function FAQ() {
    return (
        <ContentComponent title="FAQs" description={`${title} - ${subtitle}`}>
            <div className="max-w-xl mx-auto prose prose-blue">
                <h2>Welcome</h2>
                <p>
                    to{" "}
                    <a
                        href={`${process.env.MERCH_URL}`}
                        title="Obinsun"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Obinsun Merch
                    </a>{" "}
                    by rPalm.
                </p>
                <p>
                    Take a look at all our exclusive merchandise. Here, you'll
                    find everything you need from cozy sweaters in the chill
                    months to a nice loose open fit for those sunny days. Need a
                    new phone case? We've got you covered! How bout a fanny
                    pack? Browse our shop to find just what you need!
                </p>
            </div>
        </ContentComponent>
    );
}
