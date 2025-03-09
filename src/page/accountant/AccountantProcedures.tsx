import React, { useState } from 'react'
import { Table, Menu, Dropdown, Modal as AntdModal } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import useAppointments from '../../api/hooks/useAppointments'
import AccountantProceduresModal from '../../component/ModalComponent/AccountantProceduresModal'
import { useGetBills } from '../../api/hooks/useAddBill'
import EditBillModal from '../../component/ModalComponent/EditBillModal'
import { formatDate } from '../../utils/utils'

const AccountantProcedures = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [filter, setFilter] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isAddProcedureModalOpen, setIsAddProcedureModalOpen] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)

  const { data, isLoading, error } = useAppointments('2', perPage, page)
  const { data: bills, isLoading: isBillsLoading, isError } = useGetBills()

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  const filterMenu = (
    <Menu
      onClick={(e) => handleFilterChange(e.key)}
      items={[
        { key: '', label: 'All' },
        { key: 'Paid', label: 'Paid' },
        { key: 'Pending', label: 'Pending' },
      ]}
    />
  )

  // Handle Edit action
  const handleEdit = (record: any) => {
    setSelectedBill(record)
    setIsEditModalOpen(true)
  }

  const columns = [
    {
      title: 'Procedure',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (status === 1 ? 'Active' : 'Inactive'),
    },
    {
      title: 'Price',
      dataIndex: 'selling_price',
      key: 'selling_price',
      render: (price: number) => `₦${price.toLocaleString()}`,
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Last Edit',
      dataIndex: 'last_edit',
      key: 'last_edit',
      render: (date: string) => formatDate(date),
    },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_: any, record: any) => (
    //     <Dropdown
    //       overlay={
    //         <Menu>
    //           <Menu.Item key="edit" onClick={() => handleEdit(record)}>
    //             Edit
    //           </Menu.Item>
    //         </Menu>
    //       }
    //       trigger={['click']}
    //     >
    //       <Icon
    //         icon="bi:three-dots-vertical"
    //         width="20"
    //         height="20"
    //         className="cursor-pointer"
    //       />
    //     </Dropdown>
    //   ),
    // },
  ]

  return (
    <Layout>
      <HeaderSection title="Procedures" />
      <div className="flex justify-between gap-1.5 items-center mb-4">
        {/* Add New Procedures Button */}
        <button
          className="rounded bg-[#0061FF] gap-1.5 p-2.5 flex items-center"
          onClick={() => setIsAddProcedureModalOpen(true)}
        >
          <Icon
            icon="qlementine-icons:add-file-16"
            width="16"
            height="16"
            color="white"
          />
          <span className="text-white text-[16px]">Add new Procedures</span>
        </button>

        {/* Filter and Export Buttons */}
        <div className="flex items-center gap-5">
          <Dropdown overlay={filterMenu} trigger={['click']}>
            <button className="flex items-center gap-0.5 p-1.5 bg-[#0061FF] rounded">
              <Icon
                icon="line-md:filter"
                width="20"
                height="20"
                className="text-white"
              />
              <span className="text-white text-[16px]">Filter</span>
            </button>
          </Dropdown>
          <button className="flex items-center gap-0.5 p-1.5 bg-[#0061FF] rounded">
            <Icon
              icon="material-symbols:print-rounded"
              width="20"
              height="20"
              className="text-white"
            />
            <span className="text-white text-[16px]">Export</span>
            <Icon
              icon="bi:three-dots-vertical"
              width="16"
              height="16"
              className="text-white"
            />
          </button>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={bills?.response?.data || []}
        pagination={{
          current: bills?.response?.current_page || 1,
          total: bills?.response?.total || 0,
          pageSize: perPage,
          onChange: (newPage, newPageSize) => {
            setPage(newPage)
            setPerPage(newPageSize)
          },
          showSizeChanger: true,
        }}
        loading={isBillsLoading}
        rowKey="id"
      />

      {/* Add Procedure Modal */}
      <AntdModal
        visible={isAddProcedureModalOpen}
        onCancel={() => setIsAddProcedureModalOpen(false)}
        footer={null}
      >
        <AccountantProceduresModal />
      </AntdModal>

      <EditBillModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        billData={selectedBill}
      />
    </Layout>
  )
}

export default AccountantProcedures
