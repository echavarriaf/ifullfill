import {format} from 'date-fns'
// In case we have a field that is date
// we just add a property Cell
// {
//     Header: 'Date',
//     Footer: 'Date',
//     accessor: 'date',
//     Cell: ({value})=.{return format(new Date(value), 'dd/MM/yyyy')},
// }

export const COLUMNS = [
    {
        Header: 'RR Id',
        Footer: 'RR Id',
        accessor: 'rr_id',
    },
    {
        Header: 'JR Id',
        Footer: 'JR Id',
        accessor: 'jr_id',
    },
    {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Skills',
        Footer: 'Skills',
        accessor: 'skills',
    },
    {
        Header: 'Cadre',
        Footer: 'Cadre',
        accessor: 'cadre',
    },
    {
        Header: 'Location',
        Footer: 'Location',
        accessor: 'location',
    },
]