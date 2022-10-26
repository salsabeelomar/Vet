import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import Comment from './Comment';
import IComment from '../../Interfaces/post/IComment';
import LoadingComments from './LoadingComment';

interface IComments
  {
    comments:Array<IComment>,
     showMore:Function,
      commentNum:number,
      isShowMore:boolean,
      setGetComments:Function
      numComments:number
      setNumComments:Function
    }

const Comments = ({
  comments, showMore, commentNum, isShowMore, setGetComments, numComments, setNumComments,
}:IComments) => (
  <div className="comments">
    {comments.map((comment) => (
      <Comment
        setGetComments={setGetComments}
        comments={comments}
        key={comment.id}
        comment={comment}
        numComments={numComments}
        setNumComments={setNumComments}
      />
    ))}
    {isShowMore && <LoadingComments />}

    {commentNum > comments.length && (
      <div className="show-more">
        <p
          role="presentation"
          onClick={() => showMore()}
        >
          Show More
        </p>
        <KeyboardDoubleArrowDownIcon />
      </div>

    )}

  </div>
);

export default Comments;
