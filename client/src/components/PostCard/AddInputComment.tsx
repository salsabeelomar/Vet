/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import HideImageIcon from '@mui/icons-material/HideImage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { toast } from 'react-toastify';
import handleUpload from '../../helpers/handleUpload';
import ApiServices from '../../services/ApiService';
import deleteImgFromFirEBase from '../../helpers/DeleteImgFrom FireBse';
import IComment from '../../Interfaces/post/IComment';

const AddInputComment = ({
  numComments, setNumComments, postId, showComments, getComments,
  setGetComments,
}:
  {numComments:number, setNumComments:Function, postId:number,
     showComments:boolean, getComments:Array<IComment>, setGetComments:Function}) => {
  const [data, callback] = useState({
    comment: '',
    image: '',
    UserId: 1,
  });
  const [file, setFile] = useState<File|null>(null);
  const [isUpLoadImg, setIsUpLoadImg] = useState(false);
  const sendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isUpLoadImg && data.comment) {
        toast.success('Add comment is success ', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        const result = await ApiServices.post(`post/${postId}/comment`, data).then((newComment) => {
          if (showComments) {
            setGetComments([newComment.data.data, ...getComments]);
          }
        });
        setNumComments(numComments + 1);

        console.log(result);
      } else {
        toast.error('please Add Comment', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handelDeleteImg = () => {
    callback({ ...data, image: '' });
    setFile(null);

    deleteImgFromFirEBase(file);
  };
  const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    callback({
      ...data,
      comment: e.currentTarget.value,
    });
  };
  async function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    setFile(event.target.files[0]);
  }
  React.useEffect(() => {
    if (file) {
      handleUpload(
        data,
        callback,
        file,
        setIsUpLoadImg,
      );
    }
  }, [file]);

  return (
    <form onSubmit={sendComment} className="addCommentInput">

      <input
        value={data.comment}
        onChange={handelOnChange}
        placeholder="Add Comment"
        id="add-comment-btn"
        type="text"
      />
      <div style={{ display: isUpLoadImg ? 'block' : 'none' }}>
        <CircularProgress />
      </div>
      <div
        style={{ display: data.image ? 'block' : 'none' }}
        role="presentation"
        onClick={handelDeleteImg}
      >
        <HideImageIcon />
      </div>
      <label
        style={{ display: !data.image && !isUpLoadImg ? 'block' : 'none' }}
        htmlFor="upload-img-comment"
      >
        <AddPhotoAlternateIcon />
      </label>

      <input onChange={handleChange} type="file" name="" id="upload-img-comment" />
      <button className="add-comment-btn" type="submit">Comment</button>

    </form>
  );
};

export default AddInputComment;
