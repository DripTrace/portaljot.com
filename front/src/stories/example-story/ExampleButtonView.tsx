import "example-button-view.module.css";
import { ExampleButtonView as ExampleButtonViewType } from "./ExampleButtonView.mock";

const ExampleButtonView: React.FC<{
    exampleButtonView: ExampleButtonViewType;
}> = ({ exampleButtonView }) => {
    return (
        <>
            <div className="link-view p-4 shadow-lg rounded bg-white hover:bg-gray-100 cursor-pointer">
                <a
                    href={exampleButtonView.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-blue-500 hover:underline`}
                >
                    {exampleButtonView.label}
                </a>
            </div>
        </>
    );
};

export default ExampleButtonView;
