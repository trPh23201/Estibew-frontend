import { Pagination as Pagi } from "react-bootstrap";
import style from './../../../styles/Pagination.module.css';
import { useRouter } from "next/router";

export default function Pagination({ totalPage, currentPage }) {
    const router = useRouter()
    const { _page, _limit, _sort, _order, _tags, name } = router.query;

    async function paginate(page) {
        router.push(
            `/home/browsers?_page=${page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}` +
            (_tags ? `&_tags=${_tags}` : '') +
            (name ? `&name=${name}` : ''),
            undefined, { scroll: true, shallow: true })
    }

    function render() {
        var pagi = []
        for (let i = 1; i <= totalPage; i++) {
            if ((i <= currentPage && i + 3 >= currentPage) || (i >= currentPage && i - 3 <= currentPage)) {
                i == _page ?
                    pagi.push(<Pagi.Item active key={i}>{i}</Pagi.Item>) :
                    pagi.push(<Pagi.Item key={i} onClick={() => paginate(i)}>{i}</Pagi.Item>)
            }
        }
        return (pagi)
    }

    return (
        <Pagi className={style.pagination}>
            {_page == 1 || <Pagi.First onClick={() => paginate(1)} />}
            {_page == 1 || <Pagi.Prev onClick={() => paginate(_page * 1 - 1)} />}
            {totalPage == 1 || render()}
            {_page == totalPage || <Pagi.Next onClick={() => paginate(_page * 1 + 1)} />}
            {_page == totalPage || <Pagi.Last onClick={() => paginate(totalPage)} />}
        </Pagi>
    )
}