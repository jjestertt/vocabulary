import React, {useState} from "react";
import style from "./Search.module.css";
import {useFormik} from "formik";

export default function Search(props) {

    const validate = (values) => {
        const errors = {};

            if (!values.query) {
                errors.query = 'Поле обязательное';
            } else if (values.query.length < 1) {
                errors.query = 'Минимум 2 символа';
            } else if (values.query.length > 20) {
                errors.query = 'Максимум 20 символов';
            }

        return errors;
    }

    const searchInput = useFormik({
        initialValues: {
            query: "",
        },
        validate,
        onSubmit: values => {
            props.searchWordHandler(values.query);
            props.toggleSearch(false);
        }
    });

    return (
        <>
            <form onSubmit={searchInput.handleSubmit} className="position-relative">
                <div className={"mr-1 " + style.input + " " + (props.isSearch ? style.active : "")}>
                    <input placeholder="Введите слово"
                        className={"form-control form-control-sm " + (searchInput.errors.query ? "is-invalid" : "")}
                        type="text" id="query" name="query"
                        value={searchInput.values.englishName} onChange={searchInput.handleChange}/>
                    <div className="invalid-tooltip is-">
                        {searchInput.errors.query}
                    </div>
                </div>
            </form>

            {props.isSearch
                ? <button onClick={searchInput.handleSubmit} type="button"
                          title="Искать" className="btn btn-success btn-sm mr-1">
                    <i className="fas fa-search"></i>
                </button>
                : <button onClick={() => {
                    props.toggleSearch(true);
                }}
                          title="Открыть форму поиска" className="btn btn-outline-dark btn-sm mr-1">
                    <i className="fas fa-search"></i>
                </button>
            }
        </>
    )
}
