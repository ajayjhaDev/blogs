import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container, Typography, Card, CardContent } from "@mui/material";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      //   axios
      //     .get(`https://66e01c6b2fb67ac16f285efe.mockapi.io/blogs/${id}`)
      //     .then((response) => {
      //       setBlog(response.data);
      //     });

      setBlog(
        JSON.parse(localStorage.getItem("blogs"))?.find(
          (ele) => ele?.id === Number(id)
        )
      );
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            By {blog.author} | Updated on{" "}
            {new Date(blog.updatedAt).toDateString()}
          </Typography>
          <Typography variant="body1" component="p">
            {blog.body}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BlogDetail;
