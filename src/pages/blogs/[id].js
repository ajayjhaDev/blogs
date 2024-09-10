import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Uncomment this when working with actual backend
      // axios.get(`https://66e01c6b2fb67ac16f285efe.mockapi.io/blogs/${id}`).then(response => {
      //     setBlog(response.data);
      // });
      setBlog(
        JSON.parse(localStorage.getItem("blogs"))?.find(
          (ele) => ele?.id === Number(id)
        )
      );
    }
  }, [id]);

  if (!blog) return <CircularProgress />;

  return (
    <Container sx={{ mt: 4 }}>
      <Card
        sx={{ boxShadow: 3 }}
        style={{ background: "#F2F3F6", color: "#5F5C75" }}
      >
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {blog.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ mr: 2 }}>A</Avatar>
            <Typography variant="body1" color="textSecondary">
              By {blog.author} | Updated on{" "}
              {new Date(blog.updatedAt).toDateString()}
            </Typography>
          </Box>
          <Typography variant="body1" component="p">
            {blog.body}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BlogDetail;
