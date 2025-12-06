import React, { useContext } from "react";
import DataContext from "../context/dataContext";

const Start = () => {
  const { showStart, startQuiz } = useContext(DataContext);

  if (!showStart) return null;

  const categories = ["DSA", "C", "Cpp", "Java", "Python"];

  return (
    <section className="bg-dark text-white">
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-6 text-center">
            <h1 className="mb-4">Choose a Category</h1>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => startQuiz(cat)}
                className="btn btn-primary d-block w-100 mb-3 fw-bold"
              >
                {cat} Quiz
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
