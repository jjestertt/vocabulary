import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Table from "../../containers/Table/Table";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Auth from "../../containers/ Auth/Auth";
import Register from "../../containers/ Auth/Register/Register";
import {Warning} from "postcss";
import {Switch, Route} from "react-router-dom"

export default function Layout() {
    const [words, setWords] = useState(null);
    const [isFetch, setIsFetch] = useState(true);
    const [isAdd, setIsAdd] = useState(false);
    const [isAuth, setAuth] = useState(false);
    const [isSearch, toggleSearch] = useState(false);

    let api = {
        searchWordHandler: async (query) => {
            setIsFetch(true);
            try {
                let response = await axios.get(`/api/search/${query}`);
                setIsFetch(false);
                if (!response.data.error) {
                    //Получаем заного данные с сервера
                    setWords(response.data);
                }
            } catch (e) {
                console.log(e)
                setIsFetch(false);
            }
        },

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

    const toggleAddItemHandler = () => {
        setIsAdd(!isAdd);
    }

    useEffect(() => {
        api.getWordsFromServerHandler();
    }, []);

    return (
        <>
            <Navbar toggleAddItemHandler={toggleAddItemHandler}
                    isAdd={isAdd}
                    isAuth={isAuth}
                    setAuth={() => {
                        setAuth(!isAuth)
                    }}
                    isSearch={isSearch}
                    toggleSearch={toggleSearch}
                    searchWordHandler={api.searchWordHandler}
                    getWordsFromServerHandler={api.getWordsFromServerHandler}
            />
            <main className="flex-shrink-0 flex-grow-1">
                <div className="container h-100">
                    <Switch>
                        <Route exact={true} path="/" render={() => (
                            <Table isAdd={isAdd} toggleAddItemHandler={toggleAddItemHandler}
                                   words={words} setWords={setWords}
                                   isFetch={isFetch} setIsFetch={setIsFetch}
                                   api={api}
                            />
                        )}/>
                        <Route path="/auth" render={()=> <Auth/> }/>
                        <Route path="/register" render={()=> <Register/>}/>
                    </Switch>
                </div>
            </main>
            <Footer/>
        </>
    );
}
