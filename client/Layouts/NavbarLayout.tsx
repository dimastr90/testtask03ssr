import Head from 'next/head'
import Link from 'next/link'
import Navbar from "../src/components/navbar/Navbar";
import MainLayout from "./MainLayout";
import {Container} from "@material-ui/core";

export default function NavbarLayout({children}) {
    return (
        <MainLayout>
            <nav>
                <Navbar/>
            </nav>
            <main>
                <Container maxWidth='lg'>
                    {children}
                </Container>
            </main>
        </MainLayout>
    )
}