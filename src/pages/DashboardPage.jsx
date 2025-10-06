import Avatar from "boring-avatars";
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

import { getPost, createPost, getTimeAgo } from "../services/postService";


function DashboardPage() {

  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  const fileInputRef = useRef(null);

  const addImage = (e) => {
 
    const file = e.target.files[0];

    if(file){
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file));
    };
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');

    if(fileInputRef.current){
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!content.trim() && !imageFile) {
      setError('Post must contain text or an image.');
      return;
    }

    setError('')
    setLoading(true);

    const formData = new FormData();
    formData.append('content', content);
    if (imageFile) {
      formData.append('file', imageFile);
    }

    try {
      const post = await createPost(formData);
      
      setContent('');
      removeImage();
    } catch(error){
      setError(error.message);
    } finally{
      getData();
      setLoading(false);
    }

  }


  const getData = async() => {
    try {
      const data = await getPost();
        setPosts(data);
        setLoading(false);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
  }
  useEffect(() => {
    getData();  
  },[])
 
  return (
    <div className='px-24 flex flex-col items-center gap-8 my-8'>

      <div className='w-1/3 bg-[#0F172A] border border-slate-700 rounded-xl p-6 flex flex-col gap-4'>

        <div className="flex justify-between items-center">

          <div className="basis-1/2 flex gap-2 items-center">
            <Avatar name={user.username}/>
            <div className="font-bold">@{user.username}</div>
          </div>

        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <textarea 
              className="w-full rounded-xl border border-slate-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
              name="content" 
              id="content" 
              placeholder="What's on your mind"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              >
            </textarea>

            {imagePreview && (
              <div className="mt-4 relative">
                <img src={imagePreview} alt="Preview" className="rounded-lg max-w-full max-h-[200px]" />
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-6 -right-4  text-white rounded-full p-1 text-3xl"
                  >
                    &times; 
                  </button>
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

             <div className="flex justify-between items-center mt-3">
       
          <input 
            type="file" 
            accept="image/*" 
            onChange={addImage}
            className="hidden" 
            ref={fileInputRef}
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current.click()} 
            className="px-4 py-2 text-sm font-bold text-white bg-slate-600 rounded-md hover:bg-slate-700"
          >
            Add Image
          </button>

          <button 
            type="submit" 
            className="px-6 py-2 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
            
          </form>
        </div>
      </div>

      {post.map( post => 
        <div key={post.id} className='w-1/3 bg-[#0F172A] border border-slate-700 rounded-xl p-6 flex flex-col gap-4'>
          <div className="flex justify-between items-center border-b border-slate-700 pb-4">
            <div className="basis-1/2 flex gap-2 items-center">
              <Avatar name={post.user.username}/>

              <div className="font-bold">
                {post.user.username}
              </div>
            </div>

            <div className="basis-1/2 text-right text-white/50">
              {getTimeAgo(post.updated_at)}
            </div>

          </div>

          <div>
            {post.content}
          </div>
          { post.file &&
            <div className="flex justify-center bg-slate-800 border border-slate-700 rounded-xl">
              <img src={post.file} alt="Post Image" className=" max-w-full max-h-[200px] text-center flex justify-center"/>
            </div>
          }
         
      </div>
      )}

     
    </div>
    
  );
}
export default DashboardPage;