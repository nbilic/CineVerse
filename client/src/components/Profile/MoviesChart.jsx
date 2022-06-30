import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "../../api/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: "Movie breakdown by genres",
    },
  },
};

const MoviesChart = ({ user }) => {
  const [data, setData] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getUserMovies = async () => {
      try {
        const response = await api.get(`/api/movie/user/${user._id}`);
        setMovies(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserMovies();
    /* console.log(user); */
  }, []);

  useEffect(() => {
    const getGenres = () => {
      const genresArr = [];
      movies?.forEach((game) => {
        game.genres?.forEach((genre) => {
          if (!genresArr.includes(genre.name)) genresArr.push(genre.name);
        });
      });

      const arrToObj = genresArr.map((a) => {
        return {
          name: a,
          count: 0,
        };
      });
      arrToObj.forEach((element) => {
        movies.forEach((game) => {
          game.genres?.forEach((genre) => {
            if (element.name === genre.name) element.count++;
          });
        });
      });

      const sortedArr = arrToObj.sort((a, b) => b.count - a.count);

      setData({
        labels: sortedArr.map((a) => a.name),
        datasets: [
          {
            label: "Genres",
            data: sortedArr.map((a) => a.count),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    };

    movies.length && getGenres();
  }, [movies]);
  return (
    <div className="movies-chart">
      {data && <Bar data={data} options={options} />}
    </div>
  );
};

export default MoviesChart;
