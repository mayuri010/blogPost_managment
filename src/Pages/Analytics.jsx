import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Navbar from "../Component/Navbar";
import "./Analytics.css";
import { header } from "server/reply";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const Analystic = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const navigate = useNavigate();

const handleEdit = (id) => {
  navigate(`/edit-post/${id}`);
};

const handleDelete = async (id) => {
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
  });

  setTasks(tasks.filter((task) => task.id !== id));
};

// pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(tasks.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // prepare data for the bar chart:posts per author
  const authorStats=tasks.reduce((acc,post)=>{
    const author = post.auther || 'Unknown';
    acc[author] = (acc[author] || 0)+1;
    return acc;
  },{});

  const chartData = Object.keys(authorStats).map(author=>({
    name:author,
    posts:authorStats[author]
  }));

   
  // example and diff. of ceil & floor
  // Math.ceil(6.9)//7

  
  const headers = [
    { label: "ID", key: "id" },
    { label: "Title", key: "Title" },
    { label: "Author", key: "Author" },
    { label: "Date", key: "cteateAt" },
    { label : "Action", key:"action"},
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="analytics-page">
      <Navbar />
      <main className="analytics-main">
        <header className="analytics-header">
          <h1>Blog Analytics</h1>
          <p>Insights into your blog's performance and activity.</p>
        </header>

        <div className="charts-container">
          {/* Bar Chart */}
          <div className="chart-card">
            <h3>Posts per Author</h3>
            <div className="chart-card">
              <h3>Posts per Author</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="posts"
                      fill="#8884d8"
                      name="Number of Posts"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* pie chart */}
          <div className="chart-card">
            <h3>Distribution</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="posts"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Static Table */}
        <div className="posts-table-section">
          <h3>All Posts</h3>
          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <td>{header.label}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.auther}</td>

                    <td>{new Date(task.createdAt || Date.now(),).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(task.id)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(task.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* static pagination */}
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`page-btn ${currentPage === number + 1 ? "active" : ""}`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-btn "
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
