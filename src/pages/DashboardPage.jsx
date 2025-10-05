import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
// import Button from '../../components/common/Button';

function DashboardPage() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Contoh fetching data dari endpoint yang dilindungi
    api.get('/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <h2>Welcome, {user?.name || 'User'}! ({user?.email})</h2>
      <button onClick={logout} style={{ width: 'auto' }}>Logout</button>
      <hr style={{ margin: '20px 0' }} />
      <h3>Your Feed</h3>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map(post => <li key={post.id}>{post.content}</li>)}
        </ul>
      )}
    </div>
  );
}
export default DashboardPage;