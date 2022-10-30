/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import HideImageIcon from '@mui/icons-material/HideImage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { toast } from 'react-toastify';
import ApiServices from '../../services/ApiService';
import deleteImageFromStorage from '../../helpers/deleteImageFromStorage';
import IComment from '../../Interfaces/post/IComment';
import { authContext } from '../../hooks/useAuth';
import uploadImage from '../../helpers/uploadImage';

const AddInputComment = ({
  numComments, setNumComments, postId, showComments, getComments,
  setGetComments, setShowCommentInput,
}:
  {numComments:number, setNumComments:Function, postId:number, setShowCommentInput:Function,
     showComments:boolean, getComments:Array<IComment>, setGetComments:Function}) => {
  const { user } = React.useContext(authContext);
  const [data, callback] = useState({
    comment: '',
    image: '',
    UserId: user?.id,
  });
  const [file, setFile] = useState<File|null>(null);
  const [isUploadImg, setIsUploadImg] = useState(false);
  const sendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isUploadImg && data.comment) {
        toast.success('Add comment is success ');
        const result = await ApiServices.post(`post/${postId}/comments`, data).then((newComment) => {
          setShowCommentInput(false);
          if (showComments) {
            setGetComments([newComment.data.data, ...getComments]);
          }
        });
        setNumComments(numComments + 1);

        console.log(result);
      } else {
        toast.error('please Add Comment');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handelDeleteImg = () => {
    const nameFile = {
      name: data.image?.slice(data.image.indexOf('%2F') + 3, data.image?.indexOf('?')),
    };
    callback({ ...data, image: '' });
    setFile(null);

    deleteImageFromStorage(nameFile);
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
    (async () => {
      if (file) {
        await uploadImage(file, () => {});

        setIsUploadImg(true);
      }
    })();
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
      <div style={{ display: isUploadImg ? 'block' : 'none' }}>
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
        style={{ display: !data.image && !isUploadImg ? 'block' : 'none' }}
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
