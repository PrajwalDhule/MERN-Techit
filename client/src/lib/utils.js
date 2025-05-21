export const likePost = (type, id, data, setData) => {
  fetch(type, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      postId: id,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      const newData = data.map((item) => {
        if (item._id == result._id) {
          return { ...item, likes: result.likes };
        } else {
          return item;
        }
      });
      setData(newData);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleLinkClick = (event) => {
  event.stopPropagation();
};
