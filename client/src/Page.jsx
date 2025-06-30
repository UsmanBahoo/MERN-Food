import Header from './components/Header';
import Footer from './components/Footer';

const Page = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Page;