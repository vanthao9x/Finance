import React, { useEffect, useState } from "react";
import { CompanyCompData } from "../../company";
import { getPeers } from "../../api";
import CompFinderItem from "./CompFinderItem";

type Props = {
  ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyCompData>();
  useEffect(() => {
    const getCompData = async () => {
      const value = await getPeers(ticker);
      if (typeof value !== "string") {
        setCompanyData(value.data[0]);
        console.log("company finder Data: ", value.data[0]);
      } else {
        console.error("Failed to fetch company data:", value);
      }
    };
    getCompData();
  }, [ticker]);
  return (
    <div className="inline-flex rounded-md shadow-sm m-4">
      {companyData &&
        companyData?.peersList.map((ticker) => {
          return <CompFinderItem ticker={ticker} />;
        })}
    </div>
  );
};

export default CompFinder;
