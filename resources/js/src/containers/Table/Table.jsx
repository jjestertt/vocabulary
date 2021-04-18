import React, { useEffect, useState } from "react";
import TableItem from "../../components/TableItem/TableItem";
import AddItem from "../../components/TableItem/AddItem/AddItem";
import Preloader from "../../components/Preloader/Preloader";
import axios from "axios";

export default function Table(props) {
    const [words, setWords] = useState(null);
    const [isFetch, setIsFetch] = useState(true);

    let api = {
        setWordsToServerHandler: (russianName, englishName, setSubmitting) => {
            setIsFetch(true);
            axios.post("/api/words", { name: russianName, name_en: englishName }).then(
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
            axios.get("/api/words").then(response => {
                setWords(response.data);
                setIsFetch(false);
            });
        },
        deleteItemHandler: (id) => {
            setIsFetch(true);
            axios.delete(`/api/words/${id}`).then(
                response => {
                    api.getWordsFromServerHandler();
                }
            );
        },
    }

    useEffect(() => {
        api.getWordsFromServerHandler();
    }, []);

    if (!words) {
        return <Preloader />
    }

    const showTableItem = words.map((item, index) => (
        <TableItem deleteItemHandler={api.deleteItemHandler}
            key={item.id} uniqKey={item.id} index={index + 1}
            russianName={item.name} englishName={item.name_en} />
    ));



    return (
        <div>
            <AddItem setWordsToServerHandler={api.setWordsToServerHandler}
                isAdd={props.isAdd} />
            <h1 className="mb-4">Словарный запас</h1>
            {isFetch ? <Preloader />
                : <table className="table table-striped mb-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Слово на русском</th>
                            <th colSpan="3" scope="col">Слово на Английском</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showTableItem}
                    </tbody>
                </table>}
        </div>
    )
}
