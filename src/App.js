import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
     fetch("https://api.hatchways.io/assessment/students")
    .then(res => res.json())
    .then(dat => {
      // setData(data);
      const display = [];
      for(let i in dat.students){
        const avg = dat.students[i].grades.reduce((prev,cur) => (Number(prev) + Number(cur))) / dat.students[i].grades.length;
        display.push({"id": dat.students[i].id,"pic": dat.students[i].pic, "name": dat.students[i].firstName + " " + dat.students[i].lastName, "email":"Email: " + dat.students[i].email, "company": "Company: " + dat.students[i].company, "skill": "Skill: " + dat.students[i].skill,"avg": "Average: " + avg.toString()+"%", "grades": dat.students[i].grades});
      }
      setSearchRes(display);
      //for whatever reason display becomes an empty array after this function is called so it is now being set as the hook data
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

  const handleClick = () => {
    setOpen(open => !open);
  };


  let student = searchRes.map( (info,i) => {
    return (
      <div key={i} className="student">
        <img src={info.pic} className="avatar" alt="avatar"/>
        <div className="info">
          <h1>{info.name}</h1>
          <p>{info.email}</p>
          <p>{info.company}</p>
          <p>{info.skill}</p>
          <p>{info.avg}</p>
          
            {info.grades.map( (val, j) =>           
              open && (
              <ul key={val+j} id={i}> 
                <li>Test {j}: {val}%</li>
              </ul>)
            )}       
        </div>
        <button onClick={handleClick} >
          <span className={open ? "minus" : "plus"}></span>
        </button>
        <hr/>
      </div>
    )
  })

  


  // return (
  //   <div className="App">
  //         <List component="div" className={classes.root} style={{maxHeight: '100vh', overflow: 'auto', marginTop: '5em', marginBottom: '15em'}}>
            
  //               <TextField component="div" id="standard-search" label="Search" onChange={handleChange} value={searchTerm} style={{marginLeft:'0.2em', width: '100%'}}/>
  //                 {searchRes.map( a =>
  //                 <>
  //                 <ListItem component="div" button onClick={handleClick} >
  //                 <ListItemAvatar>
  //                   <Avatar src={a.pic} className={classes.large} style={{border: '0.5px solid grey'}}/>
  //                 </ListItemAvatar>
  //                 <ListItemText className={classes.text} 
  //                   primary={<h1>{a.name}</h1>} 
  //                   secondary={
  //                   <div>
  //                     <div>{a.email}</div>
  //                     <div>{a.company}</div>
  //                     <div>{a.skill}</div>
  //                     <div>{a.avg}</div>
  //                   </div>}
  //                   style={{marginLeft: '1em'}}>
  //                 </ListItemText>
  //                 {open ? <ExpandLess /> : <ExpandMore />}
  //                 </ListItem>
  //                 <Collapse in={open} timeout="auto" unmountOnExit>
  //                   <List component="div" disablePadding>
  //                     <ListItem button className={classes.nested} style={{marginLeft:'-15em'}}>
  //                       {a.grades.map( (val,i) => 
  //                         <>
  //                           <ListItemText secondary={
  //                           <ul>
  //                             <li key={i}>Test {i}: {val}%</li> 
  //                           </ul>
  //                            }/>
  //                         </>
  //                       )}
  //                     </ListItem>
  //                   </List>
  //                 </Collapse>
  //                 <Divider/>
  //               </>
  //               )}
            
  //         </List>
  //   </div>
  // );

  return(
    <div className="container">
      <div className="card">
        <input type="text" className="search" placeholder="Search by name" onChange={handleChange} value={searchTerm}/>
        {student}
      </div>
    </div>
  );
}

export default App;
