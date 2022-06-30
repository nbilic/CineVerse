import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Posts breakdown by month",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

const PostsChart = ({ posts }) => {
  const [data, setData] = useState();
  useEffect(() => {
    let postsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    posts.forEach((post) => {
      postsPerMonth[new Date(post.post.publishedAt).getMonth()]++;
    });

    setData({
      labels,
      datasets: [
        {
          label: "# of posts per month",
          data: postsPerMonth,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, []);
  return (
    <div className="posts-chart">
      {data ? (
        <Line options={options} data={data} className="chart" />
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default PostsChart;
