import { useGetAllUser } from "../../Hooks/userHooks";

const AdminUser = () => {
  const { data: users, isLoading, error } = useGetAllUser();
  console.log("users", users)
  return (
    <>
      <div>Quản Lí Người Dùng</div>
      <table
        id="basic-datatable"
        className="table table-striped table-bordered m-2"
      >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Admin</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.isAdmin}</td>
            <td>{user.phone}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminUser;
