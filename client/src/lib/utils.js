export const likePost = (type, postId, data, setData) => {
  fetch(`/${type}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      postId: postId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (Array.isArray(data)) {
        const newData = data.map((item) =>
          item._id === result._id ? { ...item, likes: result.likes } : item
        );
        setData(newData);
      } else {
        const newData = { ...data, likes: result.likes };
        setData(newData);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const makeComment = (text, postId, data, setData) => {
  fetch("/comment", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      postId,
      text,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (Array.isArray(data)) {
        const newData = data.map((item) =>
          item._id === result._id ? result : item
        );
        setData(newData);
      } else {
        const newData = result;
        setData(newData);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePost = (postid, data, setData) => {
  let confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );
  if (confirmDelete) {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(data)) {
          const newData = data.filter((item) => {
            return item._id !== result._id;
          });
          setData(newData);
        } else {
          setData(null);
        }
      });
  }
};

export const handleLinkClick = (event) => {
  event.stopPropagation();
};
