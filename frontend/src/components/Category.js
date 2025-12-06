import React from "react";

const Category = ({ categories, onSelect }) => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      <h1 className="mb-4">Choose a Category</h1>
      {Object.keys(categories).map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="btn btn-outline-light m-2 w-50"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Category;
