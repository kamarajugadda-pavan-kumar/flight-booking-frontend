import React from "react";

const PageNotFound = () => {
  return (
    <div style={styles.container}>
      <h1 className="text-2xl font-semibold	">404 - Page Not Found</h1>
      <img
        src="/assets/cartoon_404.jpeg"
        alt="Page not found"
        style={styles.image}
      />
      <button
        className="btn btn-primary btn-xs"
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
        onClick={() => (window.location.href = "/")}
      >
        Return to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "0px",
    padding: "30px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    maxHeight: "600px",
    margin: "80px auto",
    color: "#333",
  },
  image: {
    margin: "20px auto",
    maxWidth: "50%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
  },
  text: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
};

export default PageNotFound;
