import React from "react";

const List = ({ items }) => {
  return (
    <div>
      {items && items.length ? (
        <ul>
          {items.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      ) : (
        <h1>No data !</h1>
      )}
    </div>
  );
};

export default List;
