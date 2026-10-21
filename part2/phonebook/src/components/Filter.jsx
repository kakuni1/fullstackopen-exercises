const Filter = ({ filter, setFilter }) => {
  const handleFilterQuery = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      filter:{" "}
      <input
        value={filter}
        onChange={handleFilterQuery}
        placeholder="by name"
      />
    </div>
  );
};

export default Filter;
