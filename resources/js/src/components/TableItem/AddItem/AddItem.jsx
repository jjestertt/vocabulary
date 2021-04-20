import React, {useRef} from "react";
import {Formik} from "formik";
import style from "./AddItem.module.css";

export default function AddItem(props) {
    const addItemWindow = useRef();

    return (
        <div ref={addItemWindow} className={style.AddItem}
             style={{
                 height: (props.isAdd
                     ? addItemWindow.current.scrollHeight + "px"
                     : "0px")
             }}>
            <h2 className="mb-3">Пополнить запас</h2>
            <Formik
                initialValues={{
                    inputNameEn: "",
                    inputNameRus: ""
                }}
                validate={
                    values => {
                        const errors = {};
                        if (!values.inputNameRus) {
                            errors.inputNameRus = 'Поле обязательное';
                        } else if (values.inputNameRus.length <= 2) {
                            errors.inputNameRus = 'Минимум 2 символа';
                        } else if (values.inputNameRus.length > 20) {
                            errors.inputNameRus = 'Максимум 15 символов';
                        }
                        if (!values.inputNameEn) {
                            errors.inputNameEn = 'Поле обязательное';
                        } else if (values.inputNameEn.length <= 2) {
                            errors.inputNameEn = 'Минимум 2 символа';
                        } else if (values.inputNameEn.length > 20) {
                            errors.inputNameEn = 'Максимум 15 символов';
                        }
                        return errors;
                    }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    props.setWordsToServerHandler(values.inputNameRus, values.inputNameEn, setSubmitting);
                    props.toggleAddItemHandler();
                    resetForm();
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      handleReset,
                  }) => {
                    return (
                        <form onSubmit={handleSubmit} className="mb-5">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Слово на Руском</label>
                                <input type="text"
                                       className={" form-control " + ((errors.inputNameRus && touched.inputNameRus) ? " is-invalid" : "")}
                                       aria-label="Russian word"
                                       name="inputNameRus"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.inputNameRus}/>
                                {errors.inputNameRus && touched.inputNameRus &&
                                <span style={{color: 'red'}}>{errors.inputNameRus}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Введите слово на
                                    Английском
                                    языке</label>
                                <input type="text"
                                       className={" form-control " + ((errors.inputNameEn && touched.inputNameEn) ? " is-invalid" : "")}
                                       aria-label="English word"
                                       name="inputNameEn"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.inputNameEn}/>
                                {errors.inputNameEn && touched.inputNameEn &&
                                <span style={{color: 'red'}}>{errors.inputNameEn}</span>}
                            </div>
                            <button className="btn btn-success" type="submit"
                                    disabled={isSubmitting}>Отправить
                            </button>
                        </form>
                    );
                }
                }
            </Formik>
        </div>
    );
}
