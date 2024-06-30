const Row = () => {
  const indices = [...Array(20)].map((_, i) => i);

  return (
    <>
      {indices.map((index) => (
        <div key={index}>C{index}</div>
      ))}
    </>
  );
};

export default Row;
