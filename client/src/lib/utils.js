export const likePost = (type, postId, data, setData) => {
  fetch(`/api/${type}`, {
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
      if (result.error) {
        console.error("Error liking post", result.error);
        return;
      }
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
      console.error(err);
    });
};

export const makeComment = async (text, postId, data, setData) => {
  const res = await fetch("/api/comment", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      postId,
      text,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Error commenting on post", error);
    return;
  }
  const result = await res.json();
  if (Array.isArray(data)) {
    const newData = data.map((item) =>
      item._id === result._id ? { ...item, comments: result.comments } : item
    );
    setData(newData);
  } else {
    const newData = { ...data, comments: result.comments };
    setData(newData);
  }
};

export const deletePost = (postid, data, setData) => {
  let confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );
  if (confirmDelete) {
    fetch(`/api/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.error("Error deleting post", result.error);
          return;
        }
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
