import React from "react";
import style from "./SearchForm.module.scss";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";

export default function SearchForm(props) {
    const goSearch = useHistory();

    const searchForm = useFormik({
        initialValues: {
            query: "",
        },

        onSubmit: async (values , {resetForm})=> {
            await props.searchWordHandler(values.query);
            resetForm();
            goSearch.push('/search');
        }
    });




    return (
        <>
            <form className={style.SearchForm + " mr-2"} onSubmit={searchForm.handleSubmit} role="search">
                <label htmlFor="search">Search for stuff</label>
                <input type="text" placeholder="Поиск..." required
                       id="query" name="query"
                       value={searchForm.values.query} onChange={searchForm.handleChange}
                />
                <button type="submit"><i className="fa fa-search" /></button>
            </form>
        </>
    )
}
