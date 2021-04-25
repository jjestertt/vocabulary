import React from "react";
import SearchForm from "../UI/SearchForm/SearchForm";
import {NavLink} from "react-router-dom";

export default function Navbar(props) {


    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 border-bottom">
            <div className="container-fluid">
                <NavLink to="/" onClick={e => {
                    props.getWordsFromServerHandler();
                }} className="navbar-brand" href="#">Словарик</NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" onClick={e => {
                                props.getWordsFromServerHandler();
                            }} className="nav-link" aria-current="page" href="#">Главная</NavLink>
                        </li>
                        {!!props.isAuth && <li className="nav-item">
                            <a onClick={(e) => {
                                e.preventDefault();
                                props.toggleAddItemHandler();
                            }} className="nav-link" href="#">
                                {!props.isAdd ? "Добавить слово" : "Закрыть форму"}
                            </a>
                        </li>
                        }

                    </ul>
                </div>
                <SearchForm isSearch={props.isSearch} toggleSearch={props.toggleSearch}
                            searchWordHandler={props.searchWordHandler}
                />
                {props.isAuth
                    ? <button onClick={props.logoutHandler} className="btn btn-warning btn-sm">Выйти</button>
                    : <NavLink to='/login' className="btn btn-warning btn-sm">Войти</NavLink>
                }
            </div>
        </nav>
    );
}
