import React from "react";
import style from "./Auth.module.css";
import {NavLink} from "react-router-dom";

export default function Auth(props) {
    return (
            <div className={"h-100 d-flex justify-content-center align-items-center flex-column " + style.Auth}>

                <form className={"bg-light " + style.form}>
                    <h2 className="text-center mb-3">Авторизация</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password" className="form-control" id="password"/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="rememberMe"/>
                            <label className="form-check-label" htmlFor="rememberMe">Запомнить меня</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-4">Войти</button>

                    <NavLink to="register" className="d-block text-center text-secondary" href="">Зарегистрироваться</NavLink>
                </form>
            </div>
    );
}
