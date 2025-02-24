import React, { useState } from 'react'
import { Table, Pagination, Button, Modal as AntdModal } from 'antd'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientViewFormModal from '../../component/ModalComponent/DoctorPatientViewFormModal'
import Modal from '../../component/common/Modal'
import InvoiceDetailsModal from '../../component/ModalComponent/InvoiceDetailsModal'
import BillFormModal from '../../component/ModalComponent/BillFormModal'
import { getAuthCookie } from '../../api/axiosInstance'
import ScheduleModal from '../../component/ModalComponent/ScheduleModal'
import type { IPatient } from '../../types/types'
import { useFetchPatientBills } from '../../api/hooks/useGetPatientBills'
import useFetchPatientsList from '../../api/hooks/useFetchPatientsList'

interface TablePatientData {
  key: string
  id: number
  patientName: string
}

const AccountantBill = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  )
  const [page, setPage] = useState(1)
  const perPage = 10

  const { data: patientData, isLoading: isPatientLoading } =
    useFetchPatientsList(perPage, page)
  const { data: patientBillData, isLoading: isBillLoading } =
    useFetchPatientBills(selectedPatientId ?? 0)

  // Transform API response to match table data structure
  const transformedData: TablePatientData[] =
    patientData?.response?.data?.map((patient: IPatient) => ({
      key: patient.file_number,
      file_number: patient.file_number,
      patientName: patient.name,
    })) || []

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBillModalOpen, setIsBillModalOpen] = useState(false)
  const [selectedTransactionID, setSelectedTransactionID] = useState<
    string | null
  >(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const handleCancel = () => setIsModalVisible(false)

  const handleViewClick = (patientId: number) => {
    setSelectedPatientId(patientId)
    setIsBillModalOpen(true)
  }

  const onSelectChange = (keys: React.Key[]) => setSelectedRowKeys(keys)

  return (
    <Layout>
      <HeaderSection title="Bill" />
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={[
          { title: 'Patient Id', dataIndex: 'file_number', key: 'file_number' },
          {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
          },

          {
            title: 'Action',
            key: 'action',
            render: (_text, record: TablePatientData) => (
              <Button
                className="rounded-full border border-[#0061FFA1] text-[#0061FFA1]"
                onClick={() => handleViewClick(record.id)}
              >
                View
              </Button>
            ),
          },
        ]}
        dataSource={transformedData}
        loading={isPatientLoading}
        pagination={false}
      />

      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="border-[#0061FF] border-b text-[#69686A]">
            {transformedData.length}{' '}
          </span>
          <span className="text-[#69686A]"> Shown on page</span>
        </div>
        <Pagination
          current={patientData?.response?.current_page || 1}
          total={patientData?.response?.total || 1}
          pageSize={perPage}
          onChange={(page) => setPage(page)}
        />
      </div>

      <Modal
        isOpen={isModalVisible}
        onClose={handleCancel}
        title="Health Information"
        centerTitle
      >
        <DoctorPatientViewFormModal />
      </Modal>

      <AntdModal
        title={`Transaction Details - ${selectedTransactionID}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <InvoiceDetailsModal selectedTransaction={selectedTransactionID} />
      </AntdModal>

      <AntdModal
        open={isBillModalOpen}
        onCancel={() => setIsBillModalOpen(false)}
        footer={null}
      >
        <BillFormModal
          onClose={() => setIsBillModalOpen(false)}
          patientBillData={patientBillData}
          isLoading={isBillLoading}
        />
      </AntdModal>
    </Layout>
  )
}

export default AccountantBill
