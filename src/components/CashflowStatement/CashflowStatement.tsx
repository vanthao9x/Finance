import React, { useEffect, useState } from "react";
import { CompanyCashFlow } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getCashflowStatement } from "../../api";
import Table from "../Table/Table";

interface Props {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedForInvestingActivites,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) => company.commonStockIssued,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
  },
];

const CashflowStatement = (props: Props) => {
  const  ticker  = useOutletContext<string>();
  const [cashflowStatement, setCashflowStatement] = useState<CompanyCashFlow[]>();

  useEffect(() => {
    const getBalanceSheetData = async () => {
      const result = await getCashflowStatement(ticker!);
      console.log("balanceSheet: ", result);
      if (Array.isArray(result)) {
        setCashflowStatement(result);
        console.log("balanceSheet: ", result);
      }
    };
    getBalanceSheetData();
  }, []);
  return (
    <>
      {cashflowStatement ? (
        <Table config={config} data={cashflowStatement} />
      ) : (
        <h1>No result</h1>
      )}
    </>
  );
};

export default CashflowStatement;