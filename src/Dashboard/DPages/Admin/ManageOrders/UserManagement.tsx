import { useChangeStatusMutation, useDeleteUserMutation, useGetUserQuery, useUserRoleMutation } from '@/redux/features/admin/userManagement.Api';
import { Button, Dropdown, Menu, Space, Table, TableColumnsType } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner'; // Import Sonner for notifications

interface UserTableData {
  _id: string;
  key: string;
  name: string;
  role: 'admin' | 'user'; // Define allowed roles
  status: 'in-progress' | 'blocked'; // Define allowed statuses
}

const UserManagement = () => {
  const [deleteUser] = useDeleteUserMutation(); 
  const [changeStatus] = useChangeStatusMutation();
  const [updateUserRole] = useUserRoleMutation(); // Mutation for updating roles

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
  const [roles, setRoles] = useState<{ [key: string]: string }>({});

  const { data: userData, isLoading, isFetching, refetch } = useGetUserQuery(undefined);

  console.log({ isLoading, isFetching });

  const metaData = userData?.meta;

  const tableData = userData?.data?.map(({ _id, name, role, status }: UserTableData) => ({
    key: _id,
    name,
    role: roles[_id] || role, // Get role from state or API data
    status: statuses[_id] || status, // Get status from state or API data
  }));

  // Handle role change and update in the database
  const handleRoleChange = async (key: string, newRole: 'admin' | 'user') => {
    try {
      await updateUserRole({ id: key, role: newRole }).unwrap(); // Update role in DB
      setRoles((prev) => ({ ...prev, [key]: newRole })); // Update UI
      refetch(); // Refresh data
      toast.success(`User role changed to ${newRole}`);
    } catch (error) {
      console.error('Failed to update role:', error);
      toast.error('Failed to update user role. Please try again.');
    }
  };

  // Handle status change and update in the database
  const handleStatusChange = async (key: string, newStatus: 'in-progress' | 'blocked') => {
    try {
      await changeStatus({ id: key, status: newStatus }).unwrap(); // Update status in DB
      setStatuses((prev) => ({ ...prev, [key]: newStatus })); // Update UI
      refetch(); // Refresh data
      toast.success(`User status changed to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update user status. Please try again.');
    }
  };

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap(); // Trigger the delete mutation
      refetch(); // Refresh the user list after deletion
      toast.success('User deleted successfully!'); // Show success notification
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  // Role dropdown menu
  const renderRoleMenu = (record: UserTableData) => (
    <Menu>
      <Menu.Item onClick={() => handleRoleChange(record.key, 'admin')}>Admin</Menu.Item>
      <Menu.Item onClick={() => handleRoleChange(record.key, 'user')}>User</Menu.Item>
    </Menu>
  );

  // Status dropdown menu
  const renderStatusMenu = (record: UserTableData) => (
    <Menu>
      <Menu.Item onClick={() => handleStatusChange(record.key, 'in-progress')}>In Progress</Menu.Item>
      <Menu.Item onClick={() => handleStatusChange(record.key, 'blocked')}>Blocked</Menu.Item>
    </Menu>
  );

  const columns: TableColumnsType<UserTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => (
        <Dropdown overlay={renderStatusMenu(record)} trigger={['hover']}>
          <Button>{text}</Button>
        </Dropdown>
      ),
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (text, record) => (
        <Dropdown overlay={renderRoleMenu(record)} trigger={['hover']}>
          <Button>{text}</Button>
        </Dropdown>
      ),
    },
    {
      title: 'Action',
      key: 'x',
      render: (_, record) => (
        <Space>
          <Button danger onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
      width: '1%',
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={{
        current: page,
        pageSize: metaData?.limit || 8,
        total: metaData?.total || 0,
        showSizeChanger: false,
      }}
    />
  );
};

export default UserManagement;
