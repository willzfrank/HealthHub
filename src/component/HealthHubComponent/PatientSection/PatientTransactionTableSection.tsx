import { Table } from 'antd'

type ProcedureItem = {
  billItemId: number
  quantity: number
  name: string
}

type Props = {
  procedures: ProcedureItem[]
}

const TransactionsTable = ({ procedures }: Props) => {
  const columns = [
    {
      title: <span className="text-[#69686A] text-[12px]">Procedure Name</span>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <span className="text-[#69686A] text-[12px]">Quantity</span>,
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={procedures}
        pagination={false}
        className="shadow rounded"
      />
    </div>
  )
}

export default TransactionsTable
