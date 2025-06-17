import React, { useEffect, useState } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm'
import { commentGetAPI, commentPostAPI } from '../../services/CommentService'
import { toast } from 'react-toastify'
import { CommentGet } from '../Model/Comment'
import Spinner from '../Spinner/Spinner'
import StockCommentList from '../StockCommentList/StockCommentList'

type Props = {
    stockSymbol: string
}
type CommentFormInput = {
    title: string
    content: string
}

const StockComment = ({stockSymbol}: Props) => {
    const [comments, setComments] = useState<CommentGet[] | null>(null);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        getComments();
    }, [])

    const handleComment = (data: CommentFormInput) => {
        commentPostAPI(data.title, data.content, stockSymbol)
        .then((res) => {
            if(res){
                toast.success("Comment posted successfully");
                getComments();
            }
        }).catch((e) => {
            toast.warning(e?.response?.data?.message || "Server error occurred");
        });
    }
    const getComments = () => {
        setLoading(true);
        commentGetAPI(stockSymbol)
        .then((res) => {
            setLoading(false);
            if(res){
                setComments(res.data);
            }
        })
    }
  return (
    <div className='flex flex-col'>
        {loading? <Spinner/> : <StockCommentList comments={comments!}/>}
        <StockCommentForm symbol={stockSymbol} handleComment={handleComment}/>
    </div>
  )
}

export default StockComment