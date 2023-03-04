import React from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  DatePicker,
  Form,
  Typography,
  Space,
  Select,
} from "antd";

function PostsSearchForm(props: {
  posts: any;
  setPostHandler: (arg0: any) => void;
}) {
  const [form] = Form.useForm();

  const searchPosts = () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.setPostHandler(data.posts);
      });
  };

  const updatePostList = () => {
    const slicedArray = props.posts.slice(0, 5);
    props.setPostHandler(slicedArray);
  };
  return (
    <>
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Card
          title="Search"
          style={{
            marginTop: 240,
            marginBottom: 24,
            minHeight: 300,
          }}
        >
          <Space
            direction="vertical"
            size="small"
            style={{
              paddingBottom: "16px",
            }}
          ></Space>

          <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                style={{
                  marginBottom: "0px",
                }}
              >
                <Button
                  data-testid="search"
                  type="primary"
                  htmlType="submit"
                  onClick={updatePostList}
                >
                  Update{" "}
                </Button>
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={24}>
              <Form.Item
                style={{
                  marginBottom: "0px",
                }}
              >
                <Button
                  data-testid="search"
                  type="primary"
                  htmlType="submit"
                  onClick={searchPosts}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
}

export default PostsSearchForm;
