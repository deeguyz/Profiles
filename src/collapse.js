import React, {useState} from "react";

export default function Collapse(props) {
    
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(open => !open);
    };

    let expandInfo = props.grades.map( (val, index) => {
        return (
            <li key={index}>
                Test {index}: {val}%
            </li>
        );
    });
      
    return (
      <div className="student">
        <img src={props.pic} className="avatar" alt="avatar"/>
        <div className="info">
          <h1>{props.name}</h1>
          <p>{props.email}</p>
          <p>{props.company}</p>
          <p>{props.skill}</p>
          <p>{props.avg}</p>
          {open && (
            <ul>{expandInfo}</ul>
          )}
        </div>
        <button onClick={handleClick} >
          <span className={open ? "minus" : "plus"}></span>
        </button>
      </div>
    );
}