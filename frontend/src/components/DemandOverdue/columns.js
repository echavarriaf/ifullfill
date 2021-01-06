// import { format } from 'date-fns';
import {
  JournalPlus,
  PencilFill,
  PersonPlusFill,
  TrashFill,
} from "react-bootstrap-icons";

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
    Header: "RR Id",
    Footer: "RR Id",
    accessor: "rr_id",
  },
  {
    Header: "JR Id",
    Footer: "JR Id",
    accessor: "jr_id",
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
  },
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Skills",
    Footer: "Skills",
    accessor: "skills",
  },
  {
    Header: "Cadre",
    Footer: "Cadre",
    accessor: "cadre",
  },
  {
    Header: "Location",
    Footer: "Location",
    accessor: "locations",
  },
  {
    Header: "Actions",
    Footer: "Actions",
    sticky: "right",
    Cell: () => (
      <div className="actionsButtons">
        <i
          data-id="edit"
          data-toggle="tooltip"
          data-placement="top"
          title="Edit"
        >
          <PencilFill />
        </i>
        <i
          id="delete"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
        >
          <TrashFill />
        </i>
        <i data-toggle="tooltip" data-placement="top" title="Still don't know">
          <JournalPlus />
        </i>
        <i data-toggle="tooltip" data-placement="top" title="Still don't know">
          <PersonPlusFill />
        </i>
      </div>
    ),
  },
];
