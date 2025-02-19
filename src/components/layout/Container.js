const Container = ({ children }) => {
  return (
    <div className="container w-full m-auto bg-white h-screen p-4 rounded-lg shadow-lg">
      {children}
    </div>
  );
};

export default Container;
