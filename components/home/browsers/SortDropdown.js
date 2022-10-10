import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap"
import style from "../../../styles/SortDropdown.module.css";

export default function SortDropdown() {
    const router = useRouter()
    const { _limit, _sort, _order, _tags, name } = router.query;

    async function sortGames(sort, order) {
        router.push(
            `/home/browsers?_page=${1}&_limit=${_limit}&_sort=${sort}&_order=${order}` +
            (_tags ? `&_tags=${_tags}` : '')+
            (name ? `&name=${name}` : ''),
            undefined, { shallow: true }
        )
    }

    function returnSort() {
        if (_sort === 'sold') return 'Best selling'
        else if (_sort === 'price' && _order === 'asc') return 'Price: Low to High'
        else if (_sort === 'price' && _order === 'desc') return 'Price: High to Low'
        return ''
    }

    return (
        <Dropdown className={style.layout}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <span className={style.label}>Sort by:</span> {returnSort()}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={() => sortGames("sold", "desc")}>
                    Best selling
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortGames("price", "asc")}>
                    Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortGames("price", "desc")}>
                    Price: High to Low
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}