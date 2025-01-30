import CreateAccount from "./CreateAccount";
import CreateAccountForm from "./CreateAccountForm";
import LoginForm from "./Log";
import "./log-view.css";

export const LogView: React.FC = () => {
    return (
        <article>
            <section className="">
                {/* <LoginForm /> */}
                {/* <CreateAccount /> */}
                <CreateAccountForm />
            </section>
        </article>
    );
};
