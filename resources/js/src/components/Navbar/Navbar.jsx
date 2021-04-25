import React from "react";
import SearchForm from "../UI/SearchForm/SearchForm";
import {Link, NavLink} from "react-router-dom";

export default function Navbar(props) {

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 border-bottom">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand" href="#">Словарик</NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" aria-current="page" href="#">Главная</NavLink>
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
                    ? <div className="btn-group">
                        <button type="button" className="btn btn-warning btn-sm dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {props.userName}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right dropdown-menu-dark">
                            <li><Link to="/" className="dropdown-item">В профиль</Link></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><a onClick={e => {
                                e.preventDefault();
                                props.logoutHandler();
                            }} className="dropdown-item" href="#">Выйти</a></li>
                        </ul>
                    </div>
                    : <NavLink to='/login' className="btn btn-warning btn-sm">Войти</NavLink>
                }
            </div>
        </nav>
    );
}



