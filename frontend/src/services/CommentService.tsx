import axios from "axios";
import { CommentPost } from "../components/Model/Comment";
import { handleError } from "../components/Helper/ErrorHandler";

const api = "http://localhost:5169/api/Comment/";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(`${api}${symbol}`, {
      title,
      content,
      symbol,
    });
    return data;
  } catch (error) {
    handleError (error);
  }
};
