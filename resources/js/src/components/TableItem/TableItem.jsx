import React from "react";
import style from "./TableItem.module.css";

export default function TableItem(props) {
    const onDelete = () => {
        props.deleteItemHandler(props.uniqKey);
    }
    const onChangeEdit = () => {
        props.changeEditHandler(props.uniqKey, true);
    }
    return (
        <div className={"row p-2 "+ style.row + ((props.index % 2 === 0) ? " border-bottom border-top " : " bg-light" )}>
            <div className="col-1">
                <b>{props.index}</b>
            </div>
            <div className="col-4">
                <span>{props.russianName}</span>
            </div>
            <div className="col-4">
                <span>{props.englishName}</span>
            </div>
            <div className="col-2 text-right">
                <i className={"fa fa-thumbs-up mr-2 " + style.thumbsUp} onClick={onDelete}/>
                <i className={"fa fa-edit mr-2 " + style.edit} onClick={onChangeEdit} />
                <i className={"fa fa-times mr-2 " + style.times} onClick={onDelete}/>
            </div>
        </div>
    );
}


