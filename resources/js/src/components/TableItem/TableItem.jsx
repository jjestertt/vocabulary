import React from "react";

export default function TableItem(props) {
    const onDelete = () => {
        props.deleteItemHandler(props.uniqKey);
    }
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.russianName}</td>
            <td colSpan="2">{props.englishName}</td>
            <td className="text-right">
                <button  onClick={onDelete} className="btn btn-danger btn-sm" type="button"
                        id="inputGroupFileAddon03">X
                </button>
            </td>
        </tr>
    );
}


