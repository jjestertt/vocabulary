import React from "react";
import style from "./Login.module.css";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import * as Yup from "yup";

const SignupValidationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Минимальная длинна пароля 6 символов')
        .max(50, 'Максимум 50 символов')
        .required('Поле обязательное'),
    email: Yup.string().email('Неправильный email').required('Поле обязательное'),
});

export default function Login(props) {

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: SignupValidationSchema,
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
                        <input type="email" className={"form-control " + ((loginForm.errors.email && loginForm.touched.email) && " is-invalid")}
                               id="email" name="email"
                               value={loginForm.values.email} onChange={loginForm.handleChange}

                        />
                        <div id="emailFeedback" className="invalid-feedback">
                            {loginForm.errors.email}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password" className={"form-control " + ((loginForm.errors.password && loginForm.touched.password) && " is-invalid")}
                               id="password" name="password"
                               value={loginForm.values.password} onChange={loginForm.handleChange}
                        />
                        <div id="emailFeedback" className="invalid-feedback">
                            {loginForm.errors.password}
                        </div>
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
