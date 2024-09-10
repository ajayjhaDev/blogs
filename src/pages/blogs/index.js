import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import Link from "next/link";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://66e01c6b2fb67ac16f285efe.mockapi.io/blogs?page=${page}&limit=5`
      )
      .then((response) => {
        setBlogs(response.data);
        localStorage.setItem("blogs", JSON.stringify(response.data));
        setTotalPages(response.headers["x-total-count"] / 5);
      });
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Blog List
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  By {blog.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created on {new Date(blog.createdAt).toDateString()}
                </Typography>
                <Link href={`/blogs/${blog.id}`} passHref>
                  <Typography variant="body2" color="primary">
                    Read More
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalPages)}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 4 }}
      />
    </Container>
  );
};

export default Blogs;
