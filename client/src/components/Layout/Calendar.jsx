import { useEffect } from "react";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import api from "../../api/api";
import { useSelector } from "react-redux";
import "../../styles/calendar.css";
import useToggle from "../../hooks/useToggle";
import MovieReleasesModal from "../Movies/MovieReleasesModal";

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const Calendar = () => {
  const { user } = useSelector((state) => state.user);
  const [modal, toggleModal] = useToggle(false);
  const [days, setDays] = useState([]);
  const [modalMovies, setModalMovies] = useState([]);
  const [followedMovies, setFollowedMovies] = useState([]);
  const [emptySpaces, setEmptySpaces] = useState([]);
  const [calendarDate, setCalendarDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const triggerModal = (day) => {
    const formatDate = `${calendarDate.year}-${
      calendarDate.month + 1 < 10
        ? "0" + (calendarDate.month + 1)
        : calendarDate.month
    }-${day < 10 ? "0" + day : day}`;

    setModalMovies(
      followedMovies.filter((movie) => movie.release_date === formatDate)
    );

    /*   setModalMovies(followedMovies); */
    toggleModal(true);
  };

  const checkIfToday = (day) => {
    const formatedDate = `${calendarDate.month + 1}/${day}/${
      calendarDate.year
    }`;
    return formatedDate === new Date().toLocaleDateString();
  };
  const checkIfMovieReleasesOnDate = (day) => {
    const formatDate = `${calendarDate.year}-${
      calendarDate.month + 1 < 10
        ? "0" + (calendarDate.month + 1)
        : calendarDate.month
    }-${day < 10 ? "0" + day : day}`;
    return followedMovies?.find((movie) => movie.release_date === formatDate);
  };

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const changeDate = (input) => {
    if (input === "LEFT") {
      // CHECK IF MONTH < 0
      if (calendarDate.month - 1 < 0) {
        setCalendarDate({ month: 11, year: calendarDate.year - 1 });
      } else {
        setCalendarDate({ ...calendarDate, month: calendarDate.month - 1 });
      }
    } else {
      // CHECK IF MONTH > 11
      if (calendarDate.month + 1 > 11) {
        setCalendarDate({ month: 0, year: calendarDate.year + 1 });
      } else {
        setCalendarDate({ ...calendarDate, month: calendarDate.month + 1 });
      }
    }
  };

  const assembleCalendar = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month + 1);
    let arr = [];
    let empty = [];
    let counter = 0;
    if (new Date(year, month - 1, 1).getDay() !== 1) {
      const difference = Math.abs(new Date(year, month, 0).getDay());
      for (counter; counter < difference; counter++) {
        empty.push(`${counter}EMPTY`);
      }
    }
    for (let i = 1; i < daysInMonth + 1; i++) {
      arr.push(i);
    }
    setEmptySpaces(empty);
    setDays(arr);
  };

  useEffect(() => {
    assembleCalendar(calendarDate.year, calendarDate.month);
  }, [calendarDate]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    assembleCalendar(year, month);

    const getFollowedMovies = async () => {
      try {
        const response = await api.get(`/api/user/followedmovies/${user._id}`);
        let movies = [];
        if (response.data.length) {
          movies =
            response.data &&
            (await api.get(`/api/movie/movielist`, {
              params: { list: response.data },
            }));
          movies.data && setFollowedMovies(movies.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getFollowedMovies();
  }, []);
  return (
    <div className="calendar">
      <div className="calendar-top-layer">
        <MdKeyboardArrowLeft
          onClick={() => changeDate("LEFT")}
          className="calendar-arrows"
        />
        <p>{`${months[calendarDate.month]}, ${calendarDate.year}`}</p>
        <MdKeyboardArrowRight
          onClick={() => changeDate("RIGHT")}
          className="calendar-arrows"
        />
      </div>
      <div className="calendar-days">
        {emptySpaces.map((space) => (
          <div className="day empty-day" key={space}></div>
        ))}
        {days.map((day) => (
          <div
            onClick={() => triggerModal(day)}
            className={`day ${
              day + emptySpaces.length > 7 ? "not-first-week" : "first-week"
            }
            ${checkIfMovieReleasesOnDate(day) && "movie-release"}

            ${checkIfToday(day) && "today"}
            `}
            key={day}
          >
            {day}
          </div>
        ))}
      </div>
      {modal && (
        <MovieReleasesModal
          movieList={modalMovies}
          display={modal}
          setDisplay={toggleModal}
        />
      )}
    </div>
  );
};

export default Calendar;
