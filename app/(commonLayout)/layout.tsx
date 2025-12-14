import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar></Navbar>
            {children}
            <Footer />
        </>
    );
};

export default CommonLayout;