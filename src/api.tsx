import axios from 'axios';
import { CompanyProfile, CompanySearch } from "./company";

interface searchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get<searchResponse>(
      `https://financialmodelingprep.com/api/v3/search-name?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return null; // 👈 kiểu nhất quán
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const response = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error: ", error.message);
      return error.message;
    } else {
      console.log("Unknown error: ", error);
      return "An unexpected error occurred";
    }
  }
};
