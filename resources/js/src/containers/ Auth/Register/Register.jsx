import React from "react";
import style from "./Register.module.css";
import {NavLink, Redirect} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";

export default function Register(props) {
    const registerValidationSchema = Yup.object().shape({
        email: Yup.string().email('Неправильный email').required('Поле обязательное'),
        password: Yup.string()
            .min(6, 'Минимальная длинна пароля 6 символов')
            .max(50, 'Максимум 50 символов')
            .required('Поле обязательное'),
        name: Yup.string()
            .min(3, 'Минимум 3 символа')
            .max(50, 'Максимум 50 символов')
            .required('Поле обязательное'),
    });

    const registerForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: registerValidationSchema,
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

            <form className={"bg-light border " + style.form} onSubmit={registerForm.handleSubmit}>
                <h2 className="text-center mb-3">Регистрация</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Ваше имя</label>
                    <input type="name"
                           className={"form-control " + ((registerForm.errors.name && registerForm.touched.name) && " is-invalid")}
                           id="name" name="name"
                           value={registerForm.values.name} onChange={registerForm.handleChange}
                    />
                    <div id="passwordFeedback" className="invalid-feedback">
                        {registerForm.errors.name}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                           className={"form-control " + ((registerForm.errors.email && registerForm.touched.email) && " is-invalid")}
                           id="email"   name="email"
                           value={registerForm.values.email} onChange={registerForm.handleChange}
                    />
                    <div id="emailFeedback" className="invalid-feedback">
                        {registerForm.errors.email}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input type="password"
                           className={"form-control " + ((registerForm.errors.password && registerForm.touched.password) && " is-invalid")}
                           id="password" name="password"
                           value={registerForm.values.password} onChange={registerForm.handleChange}
                    />
                    <div id="passwordFeedback" className="invalid-feedback">
                        {registerForm.errors.password}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4">Зарегистрироваться</button>

                <NavLink to="/login" className="d-block text-center text-secondary">У меня уже есть аккаунт</NavLink>
            </form>
        </div>
    );
}
