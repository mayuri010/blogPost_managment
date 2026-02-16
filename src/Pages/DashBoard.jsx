import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Dashboard.css";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const fData = await fetch("http://localhost:3000/posts");
      const data = await fData.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit=(id)=>{
    navigate(`/edit-post/${id}`)
  }

  const handleReadMore=(id)=>{
    navigate(`/postDetail/${id}`)
  }
  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h1>Welcome to your Dashboard</h1>
            <p>
              Manage your posts,track engagement, and connect with your
              audience.
            </p>
          </div>
        </div>

        <div className="dashboard-status-overview">
          <div className="dash-card">
            <h3>Total Posts</h3>
            <span className="dash-number">10</span>
          </div>

          <div className="dash-card">
            <h3>Your Stories</h3>
            <span className="dash-number">5</span>
          </div>

          <div className="dash-card">
            <h3>Community Posts</h3>
            <span className="dash-number">10</span>
          </div>
        </div>

        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Recent Feed</h2>
            <button
              className="create-shortcut-btn"
              onClick={() => navigate("/create-post")}
            >
              <FaPlus />
              New Post
            </button>
          </div>

          <div className="posts-grid">
            {/* Static post card 1 */}

            {tasks.map((task) => (
              <div className="post-card">
                <div className="post-image-container">
                  <img
                    src={task.imageurl}
                    alt="Post"
                    className="post-card-image"
                  />

                  <div className="post-actions">
                    <button className="action-btn edit-btn" title="Edit Post">
                      <MdEdit size={22} color="#ffffff"  onClick={() => handleEdit(task.id)}/>
                    </button>

                    <button
                      className="action-btn delete-btn"
                      title="Delete Post"
                      onClick={() => handleDelete(task.id)}
                    >
                      <MdDelete size={22} color="#ffffff" />
                    </button>
                  </div>
                </div>

                <div className="post-card-content">
                  <div className="post-meta">
                    <span className="post-author">By Admin</span>
                    <span className="post-dete">Recent</span>
                  </div>

                  <h3 className="post-card-title">{task.title}</h3>
                  <p className="post-card-description">{task.description}</p>

                  <button className="read-more-btn" onClick={()=>handleReadMore(task.id)}>Read More</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;