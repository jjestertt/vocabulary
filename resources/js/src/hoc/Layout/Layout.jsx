import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Table from "../../containers/Table/Table";
import Footer from "../../components/Footer/Footer";
import Login from "../../containers/ Auth/Login";
import Register from "../../containers/ Auth/Register/Register";
import AddItem from "../../components/TableItem/AddItem/AddItem";
import SearchResults from "../../containers/SearchResults/SearchResults";

export default function Layout() {
    const [words, setWords] = useState(null);
    const [isFetch, setIsFetch] = useState(true);
    const [isAdd, setIsAdd] = useState(false);

    const [isSearch, toggleSearch] = useState(false);
    const [searchResults, setSearchResults] = useState(null);

    const [isAuth, setAuth] = useState(false);
    const [user, setUser] = useState({});

    let api = {
        searchWordHandler: async (query) => {
            setIsFetch(true);
            try {
                let response = await axios.get(`/api/search/${query}`);
                if (!response.data.error) {
                    //Получаем заного данные с сервера
                    setSearchResults(response.data);
                    setIsFetch(false);
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
                () => {
                    api.getWordsFromServerHandler();
                }
            );
        },
        getUserHandler: async () => {
            try {
                const response = await axios.get("/api/user");
                const data = response.data;

                setUser({
                    isAuth: true,
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    createdAt: data.updated_at
                });
            } catch (e) {
                setUser({
                    isAuth: false,
                });
            }
        },

        loginHandler: async (email, password, rememberMe) => {
            await axios.post("/api/login", {email, password, rememberMe});
            await api.getUserHandler();
        },
        logoutHandler: async () => {
            await axios.post("/api/logout/");
            setUser({
                isAuth: false,
            });
        }
    }

    const toggleAddItemHandler = () => {
        setIsAdd(!isAdd);
    }


    const [isInitialize, setInitialize] = useState(false);
    const initialize = async () => {
        setInitialize(true);
        await api.getUserHandler()
        await api.getWordsFromServerHandler();
        setInitialize(false);
    }

    useEffect(() => {
        initialize();
    }, []);

    if (isInitialize) {
        return null;
    }

    return (
        <>
            <Navbar toggleAddItemHandler={toggleAddItemHandler}
                    isAdd={isAdd}
                    isAuth={user.isAuth}
                    setAuth={() => {
                        setAuth(!isAuth)
                    }}
                    isSearch={isSearch}
                    toggleSearch={toggleSearch}
                    searchWordHandler={api.searchWordHandler}
                    getWordsFromServerHandler={api.getWordsFromServerHandler}
                    logoutHandler={api.logoutHandler}
            />
            <main className="flex-shrink-0 flex-grow-1">
                <div className="container h-100">
                    {!!user.isAuth && <AddItem setWordsToServerHandler={api.setWordsToServerHandler}
                                               toggleAddItemHandler={toggleAddItemHandler}
                                               isAdd={isAdd}/>}
                    <Switch>
                        <Route exact={true} path="/" render={() => (
                            <>
                                <Table isAdd={isAdd} toggleAddItemHandler={toggleAddItemHandler}
                                       words={words} setWords={setWords}
                                       isFetch={isFetch} setIsFetch={setIsFetch}
                                       api={api}
                                />
                            </>

                        )}/>
                        <Route path="/search" render={() => (
                            <SearchResults isAdd={isAdd} toggleAddItemHandler={toggleAddItemHandler}
                                           searchResults={searchResults} setSearchResults={setSearchResults}
                                           isFetch={isFetch} setIsFetch={setIsFetch}
                                           api={api}/>
                        )}/>
                        <Route path="/login"
                               render={() => <Login loginHandler={api.loginHandler} isAuth={user.isAuth}/>}/>
                        <Route path="/register" render={() => <Register isAuth={user.isAuth}/>}/>
                        <Route path="*" render={() => <Redirect to="/"/>}/>
                    </Switch>
                </div>
            </main>
            <Footer/>
        </>
    );
}
