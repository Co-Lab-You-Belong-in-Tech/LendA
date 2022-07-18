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
import "../styles/NewPost.css"

const schema = yup.object().shape({
  name: yup.string().required(),
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


function NewPost() {
  const { register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [availability, setAvailability] = useState(true);

  // const [filename, setFilename] = useState('Choose Photo');
  // const [uploadFile, setUploadFile] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { currentUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  // const convert2base64 = image => {
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setUploadFile(reader.result.toString());
  //   };

  //   reader.readAsDataURL(image);
  // }

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message)
  //   }

  //   dispatch(reset)
  // }, [currentUser, isError, isSuccess, message, navigate, dispatch])

  // const onChange = e => {
  //   setPic(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  
  // }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('deposit', deposit);
    formData.append('condition', condition);
    formData.append('category', category);
    formData.append('availability', availability);
   

    console.log(file)
    
    console.log(formData);
    // console.log("upladoed file",uploadFile);
    dispatch(createItem(formData))
    navigate('/')
  }

  return (
    <div className="postContainer">
      <h2>Post an Item to Lend</h2>
      <div className="newPost">
          {/* {pic ? <img src={pic} width="250" /> : null} */}
        
          <form className="lendPostForm" onSubmit={onSubmit}>
            {/* {!watch('image') || watch('image').length === 0 ? ( */}
            <div className="lendItem">
              <div className="itemRow">
                <label htmlFor="name">Item*</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  placeholder="Ex: Singer Sewing Machine"
                  value={name}
                  onChange={e => setName(e.target.value)}
                ></input>
                <p> {errors.name?.message} </p>
              </div>
              
              <div className="itemRow">
                <label htmlFor="description">Item Details*</label>
                <input
                {...register("description", { required: true })}
                  type="text"
                  name="description"
                  placeholder="Describe your item"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
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
                  value={category}
                  onChange={e => setCategory(e.target.value)}
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
                    value={deposit}
                  onChange={e => setDeposit(e.target.value)}
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
                    value={price}
                    onChange={e => setPrice(e.target.value)}
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
                    value={condition}
                    onChange={e => setCondition(e.target.value)}
                    ></input>
                    <p> {errors.condition?.message} </p>
                </div>
                <div className="itemRow">
                <label>Photo*</label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  name="image"
                  onChange={fileSelected}

                ></input>
                <p> {errors.image?.message} </p>
              </div>
                <div className="itemRow">
                <label htmlFor="availability">Available?*</label>
                <input
                  {...register("availability", { required: true })}
                  type="checkbox"
                  checked={availability}
                  name="availability"
                  onChange={e => setAvailability(e.target.value)}
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
