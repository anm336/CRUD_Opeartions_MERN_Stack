import './App.css';
import React from "react";
import Axios from "axios";

function App() {

  const[foodName, setFoodName] = React.useState("");
  const[days, setDays] = React.useState(0);

  const[foodList, setFoodList] = React.useState([]);

  const[newFoodName, setNewFoodName] = React.useState("");

  React.useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
      setFoodList(response.data);
    });
  },[foodList]);

  function handleClick(){
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  }

  function updateFood(id){
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
  }

  function deleteFood(id){
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <div className="form-group">
      <label>Enter food Item:</label>
      <input className="form-control" type="text" onChange={(event) => {
        setFoodName(event.target.value)
      }}></input><br></br>
      <label>Time since you ate:</label>
      <input className="form-control" type="number" onChange={(event) => {
        setDays(event.target.value)
      }}></input><br></br>
      </div>
      <button className="btn btn-primary btn-lg" onClick={handleClick}>Enter this item</button><br></br><br></br>
      <h2>Food Items:</h2><br></br>
      <div className="oitems">
      {foodList.map((val, key) =>{
        return <div className="items">
          <h3>{val.foodName}</h3><p>Days Since eaten: </p><h3>{val.daysSinceIAte}</h3>
          <button className="btn btn-danger delbtn" onClick={() => deleteFood(val._id)}>Delete</button>
          <div className="updateinfo">
          <input
          type="text"
          placeholder="New Food Name..."
          className="updatename"
          onChange={(event) => {
            setNewFoodName(event.target.value);
          }}
          />
          <button className="btn btn-info infobtn" onClick={() => updateFood(val._id)}>Update</button>
          </div>
        </div>
      })}
      </div>
    </div>
  );
}

export default App;
