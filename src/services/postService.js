import api from "./api";

export const getPost = async () => {
  try {
    const response = await api.get('/post/get');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get post.')
  };
};

export const getPostByUserId = async () => {
  try {
    const response = await api.get("/post/get/my-post");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get post.')

  };
};

export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/post/get/${postId}`)
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get post.')
  };
};

export const createPost = async (formData) => {
  try {
    const response = await api.post('/post/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.err.type)
    if (error.response.data.err.type === "validator, ") {
      throw new Error("content (text) : " + error.response.data.message)
    }
    throw new Error(error.response.data.message);
  }
};

export const updatePost = async (postId, formData) => {
  try {
    const response = await api.put(`/post/update/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data.data;
  } catch (error) {
    if (error.response.data.err.type === 'validator') {
      throw new Error("content (text) : " + error.response.data.message)
    }
    throw new Error(error.response.data.message);
  };
};

export const deletePost = async (postId) => {
  try {
    await api.delete(`/post/delete/${postId}`);
  } catch (error) {
    throw new Error(error.response.data.message)
  };
};


export const getTimeAgo = (dateString) => {
  const now = new Date()
  const past = new Date(dateString)
  const diffMs = now - past

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} days ago`
  if (hours > 0) return `${hours} hours ago`
  if (minutes > 0) return `${minutes} minutes ago`
  return `${seconds} detik yang lalu`
}
