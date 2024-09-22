const clearUserStoryCache = async (username) => {
  const response = await fetch("http://localhost:8000/clearStoryCache", {
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
  console.log("title");
  console.log(response.message);
  console.log(response.message[0]["title"]);
  location.reload();
  window.location.href = "http://localhost:3000";
  return response.message;
};

export default clearUserStoryCache;
