import React, { useEffect, useState } from "react";
import { CompanyKeyMetrics } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import StockComment from "../StockComment/StockComment";

interface Props {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => company.marketCapTTM,
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => company.roeTTM,
  },
  {
    label: "Cash Per Share",
    render: (company: CompanyKeyMetrics) => company.dividendYieldTTM,
    subTitle: "Dividend Yield",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
  {
    Label: "PE Ratio",
    render: (company: CompanyKeyMetrics) => company.peRatioTTM,
    subTitle:
      "This is the upperbouind of the price range that a defensive investor",
  },
];
const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  useEffect(() => {
    const getCompanyKeyRatios = async () => {
      const value = await getKeyMetrics(ticker);
      if (typeof value !== "string") {
        setCompanyData(value.data[0]);
        console.log("companyData: ", value.data[0]);
      } else {
        console.error("Failed to fetch company data:", value);
      }
    };
    getCompanyKeyRatios();
  }, [ ticker]);
  return (
    <>
      {companyData ? (
        <>
          <RatioList config={tableConfig} data={companyData} />
          <StockComment stockSymbol={ticker} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;
