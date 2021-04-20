import React from "react";

export default function Navbar(props){


    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Словарик</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Главная</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={(e)=>{
                                e.preventDefault();
                                props.toggleAddItemHandler();
                            }} className="nav-link" href="#">
                                {!props.isAdd ? "Добавить слово" : "Закрыть форму"}
                            </a>
                        </li>
                    </ul>
                </div>
                {props.isAuth
                    ? <button onClick={props.setAuth} className="btn btn-dark btn-sm">Выйти</button>
                    : <button onClick={props.setAuth} className="btn btn-dark btn-sm">Войти</button>
                }
            </div>
        </nav>
    );
}
