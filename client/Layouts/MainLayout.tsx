import Head from "next/dist/next-server/lib/head";
import Navbar from "../src/components/navbar/Navbar";
import {ToastContainer} from "react-toastify";

export default function MainLayout({children}) {
    return (
        <>
            <Head>
                <title>Booking</title>
            </Head>
                {children}

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}