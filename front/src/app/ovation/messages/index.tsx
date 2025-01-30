import LeftSidebar from "@/components/Legacy/LeftSidebar";
import PfpPost from "@/components/Legacy/PfpPost";
import ActiveBar from "@/components/Legacy/ActiveBar";
import HomeTimeline from "@/components/Legacy/HomeTimeline";
import MessageTop from "@/components/Legacy/MessageTop";

const Home = () => {
    return (
        // <div className="w-full h-full flex justify-center items-center relative">
        //   <div className=" max-w-screen-2xl w-full h-full flex relative">
        //     {/*left sidebar for navigation*/}
        <>
            <LeftSidebar />
            <MessageTop />
        </>
        //     <section>
        //     </section>
        //   </div>
        // </div>
    );
};

export default Home;
