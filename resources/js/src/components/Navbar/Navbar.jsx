import React from "react";
import Search from "../UI/Search/Search";
import {NavLink} from "react-router-dom";

export default function Navbar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
                <a onClick={e => {
                        e.preventDefault();
                        props.getWordsFromServerHandler();
                    }} className="navbar-brand" href="#">Словарик</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a onClick={e => {
                                e.preventDefault();
                                props.getWordsFromServerHandler();
                            }} className="nav-link" aria-current="page" href="#">Главная</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={(e) => {
                                e.preventDefault();
                                props.toggleAddItemHandler();
                            }} className="nav-link" href="#">
                                {!props.isAdd ? "Добавить слово" : "Закрыть форму"}
                            </a>
                        </li>
                    </ul>
                </div>
                <Search isSearch={props.isSearch} toggleSearch={props.toggleSearch}
                        searchWordHandler={props.searchWordHandler}
                />
                {props.isAuth
                    ? <button  className="btn btn-dark btn-sm">Выйти</button>
                    : <NavLink to='/auth'  className="btn btn-dark btn-sm">Войти</NavLink>
                }
            </div>
        </nav>
    );
}
