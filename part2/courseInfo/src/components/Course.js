import React from 'react';


const Course = ({ courses }) => {
    return (
      <div>
        {courses.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.name}</h1>
              {item.parts.map((part) => (
                <p key={part.id}>
                  {part.name} {part.exercises}
                </p>
              ))}
              <p>Total number of exercises {item.parts.reduce((sum,item) => sum += item.exercises, 0)}</p>
            </div>
          );
        })}
      </div>
    );
  };

  export default Course