const queryDataBase = async (username) => {
  const response = await fetch("http://localhost:8000/querySounds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // <-- Include the Content-Type header
    },
    body: JSON.stringify({
      username: `${username}`,
    }),
  }).then((response) => response.json());
  console.log(response);
  console.log(typeof response);
  console.log(response.message);
  return response.message;
};

export default queryDataBase;
