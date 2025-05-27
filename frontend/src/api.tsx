import axios from 'axios';
import { CompanyBalanceSheet, CompanyCashFlow, CompanyCompData, CompanyHistoricalDividend, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from "./company";

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

export const getKeyMetrics = async (query: string) => {
  try {
    const response = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_API_KEY}`
    );
    return response;
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

export const getIncomeStatement = async (query: string) => {
  try {
    const response = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/api/v3/income-statement/${query}?period=annual&apikey=${process.env.REACT_APP_API_KEY}`
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

export const getBalanceSheet = async (query: string) => {
  try {
    const response = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?period=annual&apikey=${process.env.REACT_APP_API_KEY}`
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

export const getCashflowStatement = async (query: string) => {
  try {
    const response = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?period=annual&apikey=${process.env.REACT_APP_API_KEY}`
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

export const getPeers = async (query: string) => {
  try {
    const response = await axios.get<CompanyCompData[]>(
      `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return response;
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

export const getTenK = async (query: string) => {
  try {
    const data = await axios.get<CompanyTenK[]>(
      `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getHistoricalDividend = async (query: string) => {
  try {
    const data = await axios.get<CompanyHistoricalDividend>(
      `https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${query}?apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};