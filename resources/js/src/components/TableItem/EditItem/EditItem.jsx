import React from "react";
import {useFormik} from "formik";
import style from "./EditItem.module.css";

export default function EditItem(props) {

    const validate = (values) => {
        const errors = {};

        Object.keys(values).map(value => {
            if (!values[value]) {
                errors[value] = 'Поле обязательное';
            } else if (values[value].length <= 2) {
                errors[value] = 'Минимум 2 символа';
            } else if (values[value].length > 20) {
                errors[value] = 'Максимум 20 символов';
            }
        });

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            russianName: props.russianName,
            englishName: props.englishName
        },
        validate,
        onSubmit: values => {
            props.editWordToServerHandler(values.russianName, values.englishName, props.uniqKey);
            props.changeEditHandler(props.uniqKey, false);
        },
    });

    return (
        <div className={"row p-2 d-flex align-items-center " + ((props.index % 2 === 0) ? "border-bottom border-top" : "bg-light")}>
            <div className="col-1">
                <b>{props.index}</b>
            </div>
            <div className="col-4 position-relative">
                <input
                    className={"form-control form-control-sm " + (formik.errors.russianName ? "is-invalid" : "")}
                    type="text" id="russianName" name="russianName"
                    value={formik.values.russianName} onChange={formik.handleChange}/>
                <div className="invalid-tooltip is-">
                    {formik.errors.russianName}
                </div>
            </div>
            <div className="col-4 position-relative">
                <input
                    className={"form-control form-control-sm " + (formik.errors.englishName ? "is-invalid" : "")}
                    type="text" id="englishName" name="englishName"
                    value={formik.values.englishName} onChange={formik.handleChange}/>
                <div className="invalid-tooltip">
                    {formik.errors.englishName}
                </div>
            </div>
            <div className="col-2 text-right">
                <i className={"fa fa-undo-alt mr-2 " + style.undo} onClick={() => {
                    props.changeEditHandler(props.uniqKey, false)
                }}/>
                <i className={"fa fa-check-square mr-2 " + style.check} onClick={formik.handleSubmit} />
            </div>
        </div>
    );
}
