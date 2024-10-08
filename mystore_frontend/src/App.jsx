import { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import './App.css'
import superstoreimg from './superstore.png';

export const App = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => fetchData());
  }

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:4000/categories/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const buildTable = () => {
    return (
      <div className='table-wrapper'>
        <h2>Categories</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const showInfo = () => {
    const emptyData = (data.length == 0)
    return (
      <div className='outer-wrapper'>
        {emptyData ? (
          <p>There is no data yet.</p>
        ) : (
          buildTable()
        )}
      </div>
    )
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div>
        <img src={superstoreimg} alt="Super Store" className="imagen" />

        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
        </Form>
      </div>
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          showInfo()
        )}
      </div>
    </div>
  )
}


