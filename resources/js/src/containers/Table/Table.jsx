import TableItem from "../../components/TableItem/TableItem";
import AddItem from "../../components/TableItem/AddItem/AddItem";
import Preloader from "../../components/Preloader/Preloader";

export default function Table(props) {

    if (!props.words) {
        return null;
    }

    const showTableItem = props.words.map((item, index) => (
        <TableItem deleteItemHandler={props.deleteItemHandler} key={item.id} uniqKey={item.id} index={index + 1} russianName={item.name} englishName={item.name_en} />
    ));

    return (
        <div>
            <AddItem setWordsToServerHandler={props.setWordsToServerHandler} isAdd={props.isAdd} />
            <h1 className="mb-4">Словарный запас</h1>
            {props.isFetch ? <Preloader />
                : <table className="table table-striped mb-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Слово на русском</th>
                            <th colSpan="3" scope="col">Слово на Английском</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showTableItem}
                    </tbody>
                </table>}
        </div>
    )
}
