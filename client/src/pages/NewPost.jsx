import React from "react"
import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { createItem } from "../features/items/itemSlice"
import { toast } from "react-toastify"
import { reset } from "../features/auth/authSlice"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactS3 from 'react-s3';
import { uploadFile } from 'react-s3';
import {
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
} from '../app/keys';
import "../styles/NewPost.css"

const schema = yup.object().shape({
  itemName: yup.string().required(),
  price: yup.string().required(),
  deposit: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  condition: yup.string().required(),
  image: yup.mixed().test('required', 'Please select a file', value => {
    return value && value.length;
  }),
  availability: yup.boolean(true),
});

const config = {
  bucketName: AWS_BUCKET_NAME,
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
}

function NewPost() {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [pic, setPic] = useState('');
  const [filename, setFilename] = useState('Choose Photo');
  const [uploadFile, setUploadFile] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { currentUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const convert2base64 = image => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadFile(reader.result.toString());
    };

    reader.readAsDataURL(image);
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset)
  }, [currentUser, isError, isSuccess, message, navigate, dispatch])

  const onChange = e => {
    setPic(e.target.files[0]);
    setFilename(e.target.files[0].name);
    ReactS3.upload( e.target.files[0], config)
    .then((data)=>{
      console.log(data);
      console.log(data.location)
    })
    .catch((err) => {
      alert(err);
    })
  }

  const submitForm = (data) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('file', pic);

   

    if (data.image.length > 0 ) {
      convert2base64(data.image[0]);
    }
    console.log(pic)
    
    console.log({data});
    console.log("upladoed file",uploadFile);
    dispatch(createItem(data))
    navigate('/')
  }

  return (
    <div className="postContainer">
      <h2>Post an Item to Lend</h2>
      <div className="newPost">
          {/* {pic ? <img src={pic} width="250" /> : null} */}
        
          <form className="lendPostForm" onSubmit={handleSubmit(submitForm)}>
            {/* {!watch('image') || watch('image').length === 0 ? ( */}
            <div className="lendItem">
              <div className="itemRow">
                <label htmlFor="itemName">Item*</label>
                <input
                  {...register("itemName", { required: true })}
                  type="text"
                  name="itemName"
                  placeholder="Ex: Singer Sewing Machine"
                ></input>
                <p> {errors.itemName?.message} </p>
              </div>
              
              <div className="itemRow">
                <label htmlFor="description">Item Details*</label>
                <input
                {...register("description", { required: true })}
                  type="text"
                  name="description"
                  placeholder="Describe your item"
                ></input>
                <p> {errors.description?.message} </p>
              </div>
              <div className="itemRow">
                <label>Category*</label>
                <input
                  {...register("category", { required: true })}
                  type="text"
                  name="category"
                  placeholder="Ex: Arts & Crafts"
                ></input>
                <p> {errors.category?.message} </p>
                </div>
                <div className="itemRow"></div>
                <div className="itemRow">
                  <label>Deposit*</label>
                  <input
                    {...register("deposit", { required: true })}
                    type="text"
                    name="deposit"
                    placeholder="Ex: $100"
                  ></input>
                  <p> {errors.deposit?.message} </p>
                </div>
                <div className="itemRow">
                  <label>Price*</label>
                  <input
                    {...register("price", { required: true })}
                    type="text"
                    name="price"
                    placeholder="Ex: $20/day"
                  ></input>
                  <p> {errors.price?.message} </p>
                </div>
                <div className="itemRow">
                  <label>Condition*</label>
                  <input
                    {...register("condition", { required: true })}
                    type="text"
                    name="condition"
                    placeholder="Ex: Great"
                    ></input>
                    <p> {errors.condition?.message} </p>
                </div>
                <div className="itemRow">
                <label htmlFor="imageUpload">Photo*</label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  placeholder={filename}
                  name="image"
                  id="imageUpload"
                  onChange={onChange}
                ></input>
                <p> {errors.image?.message} </p>
              </div>
                <div className="itemRow">
                <label htmlFor="availability">Available?*</label>
                <input
                  {...register("availability", { required: true })}
                  type="checkbox"
                  name="availability"
                ></input>
                <p> {errors.availability?.message} </p>
              </div>
              
        
              <div className="itemRowPost">
                <button type="submit" className="postBtn">
                  Post Item
                </button>
              </div>
            </div>
            {/* // ) : (<div><p>{watch('image')[0].name}</p></div>)} */}
          </form>

      </div>
    </div>
  )
}

export default NewPost
