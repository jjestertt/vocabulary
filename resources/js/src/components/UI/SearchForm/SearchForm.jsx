import React, {useState} from "react";
import style from "./SearchForm.module.scss";
import {useFormik} from "formik";

export default function SearchForm(props) {

    const searchForm = useFormik({
        initialValues: {
            query: "",
        },

        onSubmit: values => {
            props.searchWordHandler(values.query);
            props.toggleSearch(false);
        }
    });




    return (
        <>
            <form className={style.SearchForm + " mr-2"} onSubmit={searchForm.handleSubmit} role="search">
                <label htmlFor="search">Search for stuff</label>
                <input type="search" placeholder="Поиск..." required
                       id="query" name="query"
                       value={searchForm.values.englishName} onChange={searchForm.handleChange}
                />
                <button type="submit"><i className="fa fa-search" /></button>
            </form>
        </>
    )
}
