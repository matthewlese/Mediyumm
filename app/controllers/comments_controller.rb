class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: ['Comment saved.']
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if (@comment && @comment.update(comment_params))
      render json: ['Updates saved.']
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def delete
    @comment = Comment.find(params[:id])
    @comment.delete if @comment
  end

  def comment_params
    params.require(:comment).permit(:body, :commenter_id, :story_id)
  end
  
end