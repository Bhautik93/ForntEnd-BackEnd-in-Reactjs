import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [filterData, setfilterData] = useState("");

  const handleChange = (value) => {
    setfilterData(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8900/listing/users",
          {
            page: currentPage,
            limit: usersPerPage,
            searchQuery: filterData,
          }
        );
        setTotalUser(response.data.totalUser);
        setData(response.data.users);
        // console.log(response, "26");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentPage, usersPerPage, filterData]);

  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  
  const totalPages = Math.ceil(totalUser / usersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <NavBar />
      <br></br>
      <input
        className="form-control me-2 mr-50"
        style={{ width: "15%", marginLeft: "78%" }}
        type="search"
        placeholder="Search Users"
        aria-label="Search"
        value={filterData}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="container mt-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Hobbies</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.hobbies.join(", ")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Users;
