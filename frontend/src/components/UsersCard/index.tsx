import DataTable, { TableColumn } from 'react-data-table-component';
import Link from 'next/link';
type DataRow = {
  email: string;
  id: number;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
};

const columns: TableColumn<DataRow>[] = [
  {
    name: 'Id',
    selector: (row) => row.id,
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    cell: (row) => (
      <Link
        className="pr-1 text-base font-medium text-body-color text-primary"
        href={`admin/user/${row.id}`}
      >
        {row.email}
      </Link>
    ),
  },
  {
    name: 'First Name',
    selector: (row) => row.firstName,
  },
  {
    name: 'Last Name',
    selector: (row) => row.lastName,
  },
  {
    name: 'Role',
    selector: (row) => row.role,
  },
  {
    name: 'Verified',
    selector: (row) => row.isVerified,
  },
  {
    name: 'Created At',
    selector: (row) => row.createdAt,
  },
  {
    name: 'Updated At',
    selector: (row) => row.updatedAt,
  },
];
const UsersCard = ({ usersData }) => {
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <Link
            href="admin/user/new"
            className="bg-primary mx-4 my-4 px-2 py-2  text-white  hover:bg-opacity-90"
          >
            Add New User
          </Link>
          <DataTable
            title="Users"
            pagination
            columns={columns}
            data={usersData}
          />
        </div>
      </section>
    </>
  );
};

export default UsersCard;
