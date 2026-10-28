const Query = ({ query, setQuery }) => {

  return (
    <div>
      find country:{" "}
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="by name" />
    </div>
  );
};

export default Query;
