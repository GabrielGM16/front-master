import React, { useState, useEffect } from "react";
import axios from "axios";

const EditArticle = (props) => {
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const { id } = props.match.params;
    axios.get(`/api/articles/${id}`).then((response) => {
      setArticle(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    });
  }, [props.match.params]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/articles/${article.id}`, { title, content }).then(() => {
      alert("Article updated successfully!");
      props.history.push(`/articles/${article.id}`);
    });
  };

  return (
    <div>
      {article ? (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <br />
          <label>
            Content:
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Update Article</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditArticle;
