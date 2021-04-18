import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Table from "../../containers/Table/Table";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

export default function Layout() {
    const [words, setWords] = useState(null);
    const [isFetch, setIsFetch] = useState(true);
    const [isAdd, setIsAdd] = useState(false);

    let api = {
        setWordsToServerHandler: (russianName, englishName, setSubmitting) => {
            setIsFetch(true);
            axios.post("http://127.0.0.1:8000/api/words", {name: russianName, name_en: englishName}).then(
                response => {
                    if (!response.data.error) {
                        //Получаем заного данные с сервера
                        api.getWordsFromServerHandler();
                        //Раздизейбливаем кнопку в форме
                        setSubmitting(false);
                    }
                }
            );
        },
        getWordsFromServerHandler: () => {
            setIsFetch(true);
            axios.get("http://127.0.0.1:8000/api/words").then(response => {
                setWords(response.data);
                setIsFetch(false);
            });
        },
        deleteItemHandler: (id) => {
            setIsFetch(true);
            axios.delete(`http://127.0.0.1:8000/api/words/${id}`).then(
                response => {
                    api.getWordsFromServerHandler();
                }
            );
        },
    }

    const toggleAddItemHandler = () => {
        setIsAdd(!isAdd);
    }

    useEffect(() => {
        api.getWordsFromServerHandler();
    }, []);

    return (
        <>
            <Navbar toggleAddItemHandler={toggleAddItemHandler} isAdd={isAdd}/>
            <main className="flex-shrink-0">
                <div className="container">
                    <Table isFetch={isFetch}
                           words={words}
                           setWordsToServerHandler={api.setWordsToServerHandler}
                           deleteItemHandler={api.deleteItemHandler}
                           isAdd={isAdd}
                    />
                </div>
            </main>
            <Footer/>
        </>
    );
}
