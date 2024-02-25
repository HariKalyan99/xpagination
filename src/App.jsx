import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [completeMembers, setCompleteMembers] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const fetchList = async (pg) => {
      try {
        const { data } = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        let only10;
        if (pg == 1) {
          only10 = data.slice(0, 10);
        } else if (pg == 2) {
          only10 = data.slice(10, 20);
        } else if (pg == 3) {
          only10 = data.slice(20, 30);
        } else if (pg == 4) {
          only10 = data.slice(30, 40);
        } else if (pg == 5) {
          only10 = data.slice(40, data.length);
        }
        setCompleteMembers(only10);
      } catch (error) {
        alert('failed to fetch data');
      }
    };

    fetchList(pageNum);
  }, [pageNum]);

  const handlePrevious = () => {
    setPageNum(pageNum - 1);
  };

  const handleNext = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <>
    <center >
      <h1>Employee Data Table</h1>
    </center>
    <div className="tableContainer">
      <table id="tab">
        <thead>
          <tr id="tableHeading">
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {completeMembers.map((person) => {
            if (
              person.id == 46 
            ) {
              return (
                <tr
                  key={person.id}
                  style={{ borderBottom: "3px solid #009879" }}
                >
                  <td>{person.id}</td>
                  <td>{person.name}</td>
                  <td>{person.email}</td>
                  <td>{person.role}</td>
                </tr>
              );
            } else {
              return (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>{person.name}</td>
                  <td>{person.email}</td>
                  <td>{person.role}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <button onClick={handlePrevious} disabled={pageNum === 1 && true}>
          Previous
        </button>
        <button id="btn">{pageNum}</button>
        <button onClick={handleNext} disabled={pageNum === 5 && true}>
          Next
        </button>
      </div>
    </div>
    </>
  );
}

export default App;
