import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../components/Sidebar/Sidebar";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";

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
          <Sidebar  />
          <CompanyDashboard />
        </div>
      ) : (
        <div>Company not found</div>
      )}
    </>
  );
};

export default CompanyPage;
