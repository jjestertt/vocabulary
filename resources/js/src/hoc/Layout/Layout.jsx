import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Table from "../../containers/Table/Table";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Login from "../../containers/ Auth/Login";
import Register from "../../containers/ Auth/Register/Register";
import {Switch, Route} from "react-router-dom"
import Preloader from "../../components/Preloader/Preloader";

export default function Layout() {
    const [words, setWords] = useState(null);
    const [isFetch, setIsFetch] = useState(true);
    const [isAdd, setIsAdd] = useState(false);
    const [isSearch, toggleSearch] = useState(false);

    const [isAuth, setAuth] = useState(false);
    const [user, setUser] = useState({});

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
           const r = await axios.post("/api/logout/");
            setUser({
                isAuth: false,
            });
        }
    }

    const toggleAddItemHandler = () => {
        setIsAdd(!isAdd);
    }

    const initialize = async () => {
        setIsFetch(true);
        const getUser =  await api.getUserHandler();
        const getWords = await api.getWordsFromServerHandler();
        setIsFetch(false);
    }

    useEffect(() => {
        initialize();
    }, []);

    if (isFetch) {
        return <Preloader />
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
                    <Switch>
                        <Route exact={true} path="/" render={() => (
                            <Table isAdd={isAdd} toggleAddItemHandler={toggleAddItemHandler}
                                   words={words} setWords={setWords}
                                   isFetch={isFetch} setIsFetch={setIsFetch}
                                   api={api}
                            />
                        )}/>
                        <Route path="/login" render={() => <Login loginHandler={api.loginHandler} isAuth={user.isAuth}/>}/>
                        <Route path="/register" render={() => <Register isAuth={user.isAuth} />}/>
                    </Switch>
                </div>
            </main>
            <Footer/>
        </>
    );
}
