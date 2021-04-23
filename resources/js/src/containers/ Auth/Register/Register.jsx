import React from "react";
import style from "./Register.module.css";
import {NavLink, Redirect} from "react-router-dom";
import {useFormik} from "formik";

export default function Register(props) {
    const registerForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: values=>{
            console.log(values);
        }
    });

    if (props.isAuth) {
        return (
            <Redirect to="/" />
        );
    }

    return (
        <div className={"h-100 d-flex justify-content-center align-items-center flex-column " + style.Register}>

            <form className={"bg-light " + style.form} onSubmit={registerForm.handleSubmit}>
                <h2 className="text-center mb-3">Регистрация</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Ваше имя</label>
                    <input type="name" className="form-control"
                           id="name" name="name"
                           value={registerForm.values.name} onChange={registerForm.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control"
                           id="email"   name="email"
                           value={registerForm.values.email} onChange={registerForm.handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input type="password" className="form-control"
                           id="password" name="password"
                           value={registerForm.values.password} onChange={registerForm.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4">Зарегистрироваться</button>

                <NavLink to="/login" className="d-block text-center text-secondary">У меня уже есть аккаунт</NavLink>
            </form>
        </div>
    );
}
