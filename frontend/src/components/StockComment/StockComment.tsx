import React from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm'
import { commentPostAPI } from '../../services/CommentService'
import { toast } from 'react-toastify'

type Props = {
    stockSymbol: string
}
type CommentFormInput = {
    title: string
    content: string
}

const StockComment = ({stockSymbol}: Props) => {
    const handleComment = (data: CommentFormInput) => {
        commentPostAPI(data.title, data.content, stockSymbol)
        .then((res) => {
            if(res){
                toast.success("Comment posted successfully");
            }
        }).catch((e) => {
            toast.warning(e?.response?.data?.message || "Server error occurred");
        });
    }
  return (
    <StockCommentForm symbol={stockSymbol} handleComment={handleComment}/>
  )
}

export default StockComment