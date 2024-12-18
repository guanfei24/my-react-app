import React, { useEffect, useState } from "react";
import UseFetch from "./hooks/UseFetch";
import useDisclosure from "./hooks/useDisclosure";

export default function PostList() {
  const {
    data: posts = [],
    loading,
    error,
    refetch,
    isRefetching,
  } = UseFetch("https://jsonplaceholder.typicode.com/posts");
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <div>
      <h1>Post List</h1>
      <div>
        <button onClick={onOpen}>Open</button>
        <button onClick={onClose}>Close</button>
        <button onClick={onToggle}>Toggle</button>
        {isOpen ? <h1>Open</h1> : <h1>Close</h1>}
      </div>
      <button
        onClick={() => refetch("https://jsonplaceholder.typicode.com/posts")}
      >
        Refetch
      </button>
      {isRefetching && <h1>Refetching...</h1>}
      {loading ? ( // if loading is true
        <h1>Loading...</h1>
      ) : // display "Loading..."
      error ? ( // if error is true
        <h1>Error: {error.message}</h1>
      ) : isOpen ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        ""
      )}
    </div>
  );
}
