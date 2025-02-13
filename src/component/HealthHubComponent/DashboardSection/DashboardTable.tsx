type DashboardTableProps = {
  title: string
  headers: string[]
  data: Array<{
    id: string
    cells: Array<React.ReactNode>
  }>
}

const DashboardTable = ({ title, headers, data }: DashboardTableProps) => (
  <div className="rounded-[10px] bg-white w-full p-4 md:p-6 shadow-md">
    <h2 className="text-[18px] opacity-70 text-[#030229] font-bold mb-4">
      {title}
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#E0E0E0] text-left">
            {headers.map((header) => (
              <th
                key={`header-${header}`}
                className="p-2 text-[12px] font-bold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-[#F9FAFB]">
                {row.cells.map((cell, i) => (
                  <td key={`${row.id}-cell-${i}`} className="p-2 text-[14px]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="p-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)

export default DashboardTable

