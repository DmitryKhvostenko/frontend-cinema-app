const addComment = (commentsArray, filmId, comment) => {
  const existingComments = commentsArray.find((item) => item.id === filmId);

  if (existingComments) {
    existingComments.comments.push(comment);
  } else {
    const newComments = {
      id: filmId,
      comments: [comment],
    };
    commentsArray.push(newComments);
  }

  return [...commentsArray];
};

export default addComment;
