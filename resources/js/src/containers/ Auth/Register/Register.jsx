import React from "react";
import style from "./Register.module.css";
import {NavLink} from "react-router-dom";

export default function Register(props) {
    return (
        <div className={"h-100 d-flex justify-content-center align-items-center flex-column " + style.Register}>

            <form className={"bg-light " + style.form}>
                <h2 className="text-center mb-3">Регистрация</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Ваше имя</label>
                    <input type="name" className="form-control" id="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4">Зарегистрироваться</button>

                <NavLink to="/auth" className="d-block text-center text-secondary" href="">У меня уже есть аккаунт</NavLink>
            </form>
        </div>
    );
}
