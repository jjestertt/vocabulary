import React, {useEffect} from "react";
import TableItem from "../../components/TableItem/TableItem";
import AddItem from "../../components/TableItem/AddItem/AddItem";
import Preloader from "../../components/Preloader/Preloader";
import axios from "axios";
import EditItem from "../../components/TableItem/EditItem/EditItem";

export default function Table(props) {

    if (!props.words) {
        return <Preloader/>
    }

    const changeEditHandler = (id, prop) => {
        const tempWords = props.words.map(word => {
            if (word.id === id) {
                return {...word, isEdit: prop}
            }
            return word;
        });
        props.setWords(tempWords);
    }

    const showTableItem = props.words.map((item, index) => (
        item.isEdit
            ? <EditItem changeEditHandler={changeEditHandler} editWordToServerHandler={props.api.editWordToServerHandler}
                        key={item.id} uniqKey={item.id} index={index + 1}
                        russianName={item.name} englishName={item.name_en}
            />
            : <TableItem deleteItemHandler={props.api.deleteItemHandler} changeEditHandler={changeEditHandler}
                         key={item.id} uniqKey={item.id} index={index + 1}
                         russianName={item.name} englishName={item.name_en}
            />
    ));

    return (
        <div className="mb-4">
            <AddItem setWordsToServerHandler={props.api.setWordsToServerHandler}
                     toggleAddItemHandler={props.toggleAddItemHandler}
                     isAdd={props.isAdd}/>
            <h1 className="mb-4">Словарный запас</h1>
            {props.isFetch
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
