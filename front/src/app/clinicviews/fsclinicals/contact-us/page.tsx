import ContactPage from "@/components/FSClinicals/ContactPage";

export const dynamic = "auto";

const ContactUsPage: React.FC = () => {
    return (
        <div className="flex flex-col size-full">
            <main className="flex-grow size-full">
                <ContactPage />
            </main>
        </div>
    );
};

export default ContactUsPage;
