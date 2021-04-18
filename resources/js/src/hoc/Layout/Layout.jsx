import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Table from "../../containers/Table/Table";
import Footer from "../../components/Footer/Footer";

export default function Layout() {
    const [isAdd, setIsAdd] = useState(false);

    const toggleAddItemHandler = () => {
        setIsAdd(!isAdd);
    }

    return (
        <>
            <Navbar toggleAddItemHandler={toggleAddItemHandler} isAdd={isAdd} />
            <main className="flex-shrink-0">
                <div className="container">
                    <Table isAdd={isAdd}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}
