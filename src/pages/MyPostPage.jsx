import Avatar from "boring-avatars";
import { useState, useEffect, useRef } from "react";
import { getPostByUserId, getPostById, updatePost, deletePost, getTimeAgo } from "../services/postService";
import { Link } from "react-router-dom";

function MyPostPage(){

  const [post, setPost] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [editingPostId, setEditingPostId] = useState(null);

  const [editedContent, setEditedContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fileInputRef = useRef(null);

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditedContent(post.content);
    setImagePreview(post.file || '');
    setImageFile(null); // Reset file gambar baru setiap kali edit dimulai
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setError(''); // Bersihkan error saat batal
  };

  const addImage = (e) => {
    const file = e.target.files[0];

    if(file){
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file));
    };
  };

  const handleUpdate = async(postId) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('content', editedContent);

    if (imageFile) {
      formData.append('file', imageFile);
    };

    try {
      const data = await updatePost(postId, formData);
      setEditingPostId(null);
      getPost();

    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false)
    };
  };

  //  const cancelEdit = () => {
  //   setEditing(false);
  //   setEditedContent(post.content);
  //   setImageFile(null);
  //   setImagePreview(post.file || '');
  // };

  const handleDelete = async(postId) => {  
    if(window.confirm("Are you sure you want to delete this post?")) {
      try {
        console.log(postId)
        await deletePost(postId);
        getPost();
      
      } catch(error){
        setError(error.message);
      };
    };
  };

  const getPost = async() => {
    setLoading(true);
    try {
      const data = await getPostByUserId();
      setPost(data);
  
    } catch(error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost();
  },[]);

return(
  <div className='px-24 flex flex-col items-center gap-8 my-8 relative'>

    <Link to="/dashboard">
      <button className="absolute right-1/3 -top-8 text-5xl cursor-pointer">&times;</button>
    </Link>

    {loading && post.length === 0 && <p>Loading your posts...</p>}
    {error && <p className="text-red-500">{error}</p>}

    {!loading && post.length > 0 ? (
      post.map(post => 
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

          {editingPostId === post.id ? (
            <div>
              <textarea
                className="w-full p-2 bg-slate-700 text-white rounded-md mb-2"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />

              {imagePreview && (
                <div className="my-2">
                  <img src={imagePreview} alt="Preview" className="rounded-lg max-w-xs h-auto" />
                </div>
              )}

              <input 
                type="file" 
                accept="image/*" 
                onChange={addImage}
                className="hidden"
                ref={fileInputRef}
              />

              <div className="flex justify-between items-center mt-2">

                <button 
                  type="button" 
                  onClick={() => fileInputRef.current.click()} 
                  className="text-sm text-blue-400 hover:underline"
                >
                  Change Image
                </button>

                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(post.id)} disabled={loading} className="text-sm px-4 py-1 bg-green-600 rounded">
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={cancelEdit} className="text-sm px-4 py-1 bg-gray-600 rounded">Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div>
                {post.content}
              </div>

              { post.file && (
                <div className="flex justify-center bg-slate-800 border border-slate-700 rounded-xl">
                  <img src={post.file} alt="Post Image" className=" max-w-full max-h-[200px] text-center flex justify-center"/>
                </div>
              )}

            <div className="flex gap-2">
              <button onClick={() => startEditing(post)} className="text-xs text-blue-400 hover:underline">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="text-xs text-red-400 hover:underline">{post.id}Delete</button>
            </div>
            </>  
          )}

          {/* <div>
            {post.content}
          </div>
          { post.file &&
            <div className="flex justify-center bg-slate-800 border border-slate-700 rounded-xl">
              <img src={post.file} alt="Post Image" className=" max-w-full max-h-[200px] text-center flex justify-center"/>
            </div>
          } */}

          {/* {!editing && 
          (
          <div className="flex gap-2">
            <button onClick={() => startEditing(post)} className="text-xs text-blue-400 hover:underline">Edit</button>
            <button onClick={() => handleDelete(post.id)} className="text-xs text-red-400 hover:underline">{post.id}Delete</button>
          </div>
        )
          } */}
         
      </div>
     
      )
    ) : (
      <div>
        <div className="font-orbitron font-bold text-4xl "> No post yet</div>
        <Link to="/dashboard">
          <button className="border border-slate-700 rounded-xl px-8 py-4 my-8 cursor-pointer">Back to Dashboard</button>
        </Link>
      </div>
    )}
  </div>
)
}

export default MyPostPage;