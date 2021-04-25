import React, {useEffect} from "react";
import TableItem from "../../components/TableItem/TableItem";
import Preloader from "../../components/UI/Preloader/Preloader";
import EditItem from "../../components/TableItem/EditItem/EditItem";
import {Link} from "react-router-dom";

const renderValidatorPage = (message) => {
    return (
        <>
            <h1 className="mb-4">Результаты поиска</h1>
            <p>{message}</p>
            <Link to="/">Вернуться на главную</Link>
        </>
    );
}

export default function SearchResults(props) {
    //Проверка на отсутствие данных
    if (!props.searchResults) {
        return renderValidatorPage('Пожалуйста введите запрос');
    }
    //Обработчик ошибок
    if (!!props.searchResults.errorMessage) {
        return renderValidatorPage(props.searchResults.errorMessage);
    }

    const changeEditHandler = (id, prop) => {
        const tempResults = props.searchResults.map(result => {
            if (result.id === id) {
                return {...result, isEdit: prop}
            }
            return result;
        });
        props.setSearchResults(tempResults);
    }
    //Функция которая обновляет состояние компоненты поиска после изменения слова.
    const onEditWordsToServer = async (russianName, englishName, uniqKey) => {
        await props.api.editWordToServerHandler(russianName, englishName, uniqKey);
        const searchResults = props.searchResults.map((item) => {
            if (item.id === uniqKey) {
                return {id: item.id, name: russianName, name_en: englishName};
            }
            return item;
        });
        props.setSearchResults(searchResults);
    }

    const onDelete = async(id) => {
        await props.api.deleteItemHandler(id);
        const searchResults = props.searchResults.filter(item => item.id !== id);
        props.setSearchResults(searchResults);
    }

    const showTableItem = props.searchResults.map((item, index) => (
        item.isEdit
            ?
            <EditItem changeEditHandler={changeEditHandler} editWordToServerHandler={onEditWordsToServer}
                      key={item.id} uniqKey={item.id} index={index + 1}
                      russianName={item.name} englishName={item.name_en}
            />
            : <TableItem deleteItemHandler={onDelete} changeEditHandler={changeEditHandler}
                         key={item.id} uniqKey={item.id} index={index + 1}
                         russianName={item.name} englishName={item.name_en}
            />
    ));

    useEffect(() => {
        return () => {
            props.setSearchResults(null);
        }
    }, []);

    return (
        <div className="pt-2 pb-5 mb-2">
            <h1 className="mb-4">Результаты поиска</h1>
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
