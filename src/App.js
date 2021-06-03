import './App.css';
import React, {useState, useEffect} from 'react';
import Collapse from "./collapse"

function App() {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  useEffect(() => {
     fetch("https://api.hatchways.io/assessment/students")
    .then(res => res.json())
    .then(dat => {
      const display = [];
      for(let i in dat.students){
        const avg = dat.students[i].grades.reduce((prev,cur) => (Number(prev) + Number(cur))) / dat.students[i].grades.length;
        display.push({"id": dat.students[i].id,"pic": dat.students[i].pic, "name": dat.students[i].firstName + " " + dat.students[i].lastName, "email":"Email: " + dat.students[i].email, "company": "Company: " + dat.students[i].company, "skill": "Skill: " + dat.students[i].skill,"avg": "Average: " + avg.toFixed(2) +"%", "grades": dat.students[i].grades, "tags": []});
      }
      setSearchRes(display);
      setData(display);
    });
  }, []);  

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchRes(data)
    const res = data.filter(o => o.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    setSearchRes(res);
  }, [searchTerm]);

  let card = searchRes.map( info => {
    return(
      <Collapse key={info.id} pic={info.pic} name={info.name} email={info.email} company={info.company} skill={info.skill} avg={info.avg} grades={info.grades} tags={info.tags}/>
    )
  })

  return(
    <div className="container">
      <div className="card">
        <input type="text" className="search" placeholder="Search by name" onChange={handleChange} value={searchTerm}/>
        {card}
      </div>
    </div>
  );
}

export default App;
