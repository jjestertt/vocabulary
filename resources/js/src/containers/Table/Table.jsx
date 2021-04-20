import React, {useEffect, useState} from "react";
import TableItem from "../../components/TableItem/TableItem";
import AddItem from "../../components/TableItem/AddItem/AddItem";
import Preloader from "../../components/Preloader/Preloader";
import axios from "axios";
import EditItem from "../../components/TableItem/EditItem/EditItem";

export default function Table(props) {
    const [words, setWords] = useState(null);
    const [isFetch, setIsFetch] = useState(true);


    let api = {
        editWordToServerHandler: (russianName, englishName, wordId) => {
            setIsFetch(true);
            axios.put(`/api/words/${wordId}`, {name: russianName, name_en: englishName}).then(
                response => {
                    if (!response.data.error) {
                        //Получаем заного данные с сервера
                        api.getWordsFromServerHandler();
                    }
                }
            );
        },
        setWordsToServerHandler: (russianName, englishName, setSubmitting) => {
            setIsFetch(true);
            axios.post("/api/words", {name: russianName, name_en: englishName}).then(
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
        return <Preloader/>
    }

    const changeEditHandler = (id, prop) => {
        const tempWords = words.map(word => {
            if (word.id === id) {
                return {...word, isEdit: prop}
            }
            return word;
        });
        setWords(tempWords);
    }

    const showTableItem = words.map((item, index) => (
        item.isEdit
            ? <EditItem changeEditHandler={changeEditHandler} editWordToServerHandler={api.editWordToServerHandler}
                        key={item.id} uniqKey={item.id} index={index + 1}
                        russianName={item.name} englishName={item.name_en}
            />
            : <TableItem deleteItemHandler={api.deleteItemHandler} changeEditHandler={changeEditHandler}
                         key={item.id} uniqKey={item.id} index={index + 1}
                         russianName={item.name} englishName={item.name_en}
            />
    ));

    return (
        <div className="mb-4">
            <AddItem setWordsToServerHandler={api.setWordsToServerHandler}
                     toggleAddItemHandler={props.toggleAddItemHandler}
                     isAdd={props.isAdd}/>
            <h1 className="mb-4">Словарный запас</h1>
            {isFetch
                ? <Preloader/>
                : <div className="mt-4">
                    <div className="row pt-3 pb-3 pl-2 pr-2 border-top border-bottom">
                        <div className="col-1">
                            <b>#</b>
                        </div>
                        <div className="col-4">
                            <b>Слово на русском</b>
                        </div>
                        <div className="col-4">
                            <b>Слово на Английском</b>
                        </div>
                        <div className="col-3"></div>
                    </div>

                    {showTableItem}

                </div>

            }
        </div>
    )
}
