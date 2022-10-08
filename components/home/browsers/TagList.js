import { useRouter } from "next/router";
import { useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
import { BsCheckLg } from 'react-icons/bs';
import style from "../../../styles/TagList.module.css";

export default function TagList({ tags }) {
    const router = useRouter();
    const { _limit, _sort, _order, _tags, name } = router.query;
    const [searchKey, setSearchKey] = useState('') //SearchKey

    async function filterGames(id) {
        if (_tags) {
            const arr = _tags.split("|")
            if (arr.includes(id + '')) {
                const index = arr.indexOf(id + '')
                arr.splice(index,1)
                id = arr.join("|")
            } else {
                id = _tags + "|" + id
            }
        }

        router.push(
            `/home/browsers?_page=${1}&_limit=${_limit}&_sort=${_sort}&_order=${_order}` +
            (id === '' ? '' : `&_tags=${id}`) +
            (name ? `&name=${name}` : ''),
            undefined, { shallow: true }
        )
    }

    function renderTags() {
        return tags?.map(tag => (
            tag.name.toUpperCase().indexOf(searchKey.toUpperCase()) > -1 &&
            <ListGroup.Item action key={tag.id}
                onClick={() => filterGames(tag.id)}
                className={_tags ?
                    (_tags.split("|").includes(tag.id + '') ? `${style.item} ${style.item_checked}` : style.item) :
                    style.item
                }
            >
                <span>{tag.name}</span>&emsp;
                {_tags && (_tags.split("|").includes(tag.id + '') && <BsCheckLg className={style.icon} />)}
            </ListGroup.Item>
        ))
    }

    return (
        <ListGroup className={style.tag_list}>
            <Form.Control type="text"
                className={style.searchForm}
                placeholder="Filter..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)} />
            {renderTags()}
        </ListGroup>
    )
}