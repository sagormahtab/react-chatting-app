import React from "react";
import "./ActiveList.css";
import onlineIcon from "../../icons/onlineIcon.png";

const ActiveList = ({ users }) => {
  return (
    <div className="textContainer">
      {users ? (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            <h2>
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  {name}
                  <img alt="Online Icon" src={onlineIcon} />
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ActiveList;
