import { useGetAllCarsQuery } from '@/redux/features/admin/carManagement.Api';
import { ICar } from '@/types/car.type';
import { TQueryParam } from '@/types/global';
import { Button, Space, Table, TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';

export type TTableData = Pick<ICar, 'model' | 'brand' | 'category' | 'imageUrl'>;

const AllCar = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: carData,
    isLoading,
    isFetching,
  } = useGetAllCarsQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  console.log({ isLoading, isFetching });

  const metaData = carData?.meta;

  const tableData = carData?.data?.map(({ _id, model, brand, category, imageUrl }) => ({
    key: _id,
    model,
    brand,
    category,
    imageUrl,
  }));

  // Extract unique filter values
  const modelFilters = [
    ...new Set(carData?.data?.map((item) => item.model) || []),
  ].map((model) => ({ text: model, value: model }));

  const brandFilters = [
    ...new Set(carData?.data?.map((item) => item.brand) || []),
  ].map((brand) => ({ text: brand, value: brand }));

  const categoryFilters = [
    ...new Set(carData?.data?.map((item) => item.category) || []),
  ].map((category) => ({ text: category, value: category }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Image',
      key: 'imageUrl',
      dataIndex: 'imageUrl',
      render: (url) => <img src={url} alt="Car" style={{ width: '100px', height: 'auto' }} />,
    },
    {
      title: 'Brand',
      key: 'brand',
      dataIndex: 'brand',
      filters: brandFilters,
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: 'Model',
      key: 'model',
      dataIndex: 'model',
      filters: modelFilters,
      onFilter: (value, record) => record.model === value,
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      filters: categoryFilters,
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Action',
      key: 'x',
      render: () => (
        <Space>
          <Button>Details</Button>
          <Button>Delete</Button>
        </Space>
      ),
      width: '1%',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (pagination, filters) => {
    const queryParams: TQueryParam[] = [];

    if (filters.brand) {
      filters.brand.forEach((brand) =>
        queryParams.push({ name: 'brand', value: brand })
      );
    }
    if (filters.model) {
      filters.model.forEach((model) =>
        queryParams.push({ name: 'model', value: model })
      );
    }
    if (filters.category) {
      filters.category.forEach((category) =>
        queryParams.push({ name: 'category', value: category })
      );
    }

    setParams(queryParams);
    setPage(pagination.current || 1); // Update the page when pagination changes
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      pagination={{
        current: page,
        pageSize: metaData?.limit || 8,
        total: metaData?.total || 0,
        showSizeChanger: false, // Optional: Disable page size changer
      }}
    />
  );
};

export default AllCar;
