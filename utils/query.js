export const queryByEnterUrl = (_page, _limit, _sort, _order, _tags, name) => {
    var queryString = (_page && _limit) ? `_page=${_page}&_limit=${_limit}` : ''; //paginate
    queryString += (_sort && _order) ? `&_sort=${_sort}&_order=${_order}` : ''; //sort
    queryString += _tags ? `&_tags=${_tags}` : '';
    queryString += name ? `&name_like=${name}` : ''; //query by search name
    return queryString;
}

export const queryByPagi = (_page, _limit, _sort, _order, _tags, name, page) => {
    var queryString = (_page && _limit) ? `_page=${page}&_limit=${_limit}` : '';
    queryString += (_sort && _order) ? `&_sort=${_sort}&_order=${_order}` : '';
    queryString += _tags ? `&_tags=${_tags}` : '';
    queryString += name ? `&name_like=${name}` : '';
    return queryString;
}

export const queryBySort = (_page, _limit, _sort, _order, _tags, name, sort, order) => {
    var queryString = (_page && _limit) ? `_page=${1}&_limit=${_limit}` : '';
    queryString += (_sort && _order) ? `&_sort=${sort}&_order=${order}` : '';
    queryString += _tags ? `&_tags=${_tags}` : '';
    queryString += name ? `&name_like=${name}` : '';
    return queryString;
}

export const queryByTag = (_page, _limit, _sort, _order, name, id) => {
    var queryString = (_page && _limit) ? `_page=${1}&_limit=${_limit}` : '';
    queryString += (_sort && _order) ? `&_sort=${_sort}&_order=${_order}` : '';
    queryString += id === '' ? '' : `&_tags=${id}`;
    queryString += name ? `&name_like=${name}` : '';
    return queryString;
}

export const queryBySearch = (_page, _limit, _sort, _order, _tags, keyWord) => {
    var queryString = (_page && _limit) ? `_page=${1}&_limit=${_limit}` : '';
    queryString += (_sort && _order) ? `&_sort=${_sort}&_order=${_order}` : '';
    queryString += _tags ? `&_tags=${_tags}` : '';
    queryString += keyWord !== '' ? `&name_like=${keyWord}` : '';
    return queryString;
}