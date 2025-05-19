import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../components/Sidebar/Sidebar";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import Tile from "../../components/Tile/Tile";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfile = async () => {
      const result = await getCompanyProfile(ticker!);
      if (Array.isArray(result)) {
        setCompany(result[0]);
        console.log("company: dsfdsfdsf: ", result[0]);
      }
    };
    getProfile();
  }, [ticker]);
  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} symbol={ticker!}/>
            <Tile title="Price" subTitle={company.price.toString()} symbol=""/>
            <Tile title="Sector" subTitle={company.sector} symbol=""/>
            <Tile title="DFC" subTitle={company.dcf.toString()} symbol=""/>
            <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <div>Company not found</div>
      )}
    </>
  );
};

export default CompanyPage;
