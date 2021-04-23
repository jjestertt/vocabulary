import React from "react";
import style from "./Login.module.css";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";

export default function Login(props) {
    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values=>{
            props.loginHandler(values.email, values.password, values.rememberMe);
        }
    });

    if (props.isAuth) {
        return (
            <Redirect to="/" />
        );
    }

    return (
            <div className={"h-100 d-flex justify-content-center align-items-center flex-column " + style.Auth}>

                <form className={"bg-light " + style.form} onSubmit={loginForm.handleSubmit}>
                    <h2 className="text-center mb-3">Авторизация</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control"
                               id="email" name="email"
                               value={loginForm.values.email} onChange={loginForm.handleChange}

                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password" className="form-control"
                               id="password" name="password"
                               value={loginForm.values.password} onChange={loginForm.handleChange}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input"
                               id="rememberMe" name="rememberMe"
                               value={loginForm.values.rememberMe} onChange={loginForm.handleChange}
                        />
                            <label className="form-check-label" htmlFor="rememberMe">Запомнить меня</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-4">Войти</button>

                    <NavLink to="register" className="d-block text-center text-secondary">Зарегистрироваться</NavLink>
                </form>
            </div>
    );
}
