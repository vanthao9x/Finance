import React from "react";

interface Props {
  config: any;
  data: any;
}

const Table = ({ config, data }: Props) => {
  
  const rerenderRows = data.map((company: any) => {
    return <tr key={company.cik}>{config.map((val: any) => {
      return <td className="p-3">{val.render(company)}</td>
  })}</tr>;
  });
  const renderHeaders = config.map((config: any) => {
    return (
      <th
        key={config.label}
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="bg-white shadown rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead>
          <tr className="min-w-full divide-y divide-gray-200 m-5">
            {renderHeaders}
          </tr>
        </thead>
        <tbody>{rerenderRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
