import React, { useEffect, useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Dashboard.css";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  // Fetch Posts
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  // Load Data + Favorites
  useEffect(() => {
    fetchData();

    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  // Toggle Favorite
  const toggleFavorite = (taskId) => {
    let updatedFavorites;

    if (favorites.includes(taskId)) {
      updatedFavorites = favorites.filter((id) => id !== taskId);
      toast.info("Removed from favorites");
    } else {
      updatedFavorites = [...favorites, taskId];
      toast.success("Added to favorites ❤️");
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  // Delete Post
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );

      toast.success("Post Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  // Read More
  const handleReadMore = (id) => {
    navigate(`/postDetail/${id}`);
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h1>Welcome to your Dashboard</h1>
            <p>
              Manage your posts, track engagement, and connect
              with your audience.
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="dashboard-status-overview">
          <div className="dash-card">
            <h3>Total Posts</h3>
            <span className="dash-number">
              {tasks.length}
            </span>
          </div>

          <div className="dash-card">
            <h3>Favorites</h3>
            <span className="dash-number">
              {favorites.length}
            </span>
          </div>
        </div>

        {/* Posts Section */}
        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">
              Recent Feed
            </h2>

            <button
              className="create-shortcut-btn"
              onClick={() => navigate("/create-post")}
            >
              <FaPlus />
              New Post
            </button>
          </div>

          <div className="posts-grid">
            {tasks.map((task) => (
              <div className="post-card" key={task.id}>
                <div className="post-image-container">
                  <img
                    src={task.imageurl}
                    alt="Post"
                    className="post-card-image"
                  />

                  {/* ⭐ Favorite Button */}
                  <button
                    className={`favorite-btn ${
                      favorites.includes(task.id)
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleFavorite(task.id)
                    }
                  >
                    <FaStar
                      size={22}
                      color={
                        favorites.includes(task.id)
                          ? "gold"
                          : "#ffffff"
                      }
                    />
                  </button>

                  {/* Edit/Delete */}
                  <div className="post-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() =>
                        handleEdit(task.id)
                      }
                    >
                      <MdEdit size={22} />
                    </button>

                    <button
                      className="action-btn delete-btn"
                      onClick={() =>
                        handleDelete(task.id)
                      }
                    >
                      <MdDelete size={22} />
                    </button>
                  </div>
                </div>

                <div className="post-card-content">
                  <div className="post-meta">
                    <span className="post-author">
                      By Admin
                    </span>
                    <span className="post-date">
                      Recent
                    </span>
                  </div>

                  <h3 className="post-card-title">
                    {task.title}
                  </h3>

                  <p className="post-card-description">
                    {task.description?.slice(0, 100)}...
                  </p>

                  <button
                    className="read-more-btn"
                    onClick={() =>
                      handleReadMore(task.id)
                    }
                  >
                    Read More
                  </button>
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