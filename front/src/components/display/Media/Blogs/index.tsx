import {
    BackdropVideo,
    BlogBody,
    BlogContainer,
    BlogContent,
    BlogTitle,
    ContentWrapper,
    PostBackdrop,
    PostWrapper,
} from "./BlogElements";
import { blogPosts } from "./index.data";

const Blog = () => {
    return (
        <>
            <BlogContainer>
                {blogPosts.map((blogPost, id) => {
                    return (
                        <PostWrapper key={id}>
                            <PostBackdrop>
                                <BackdropVideo
                                    autoPlay
                                    loop
                                    muted
                                    src={blogPost.vid}
                                />
                            </PostBackdrop>
                            <ContentWrapper>
                                <BlogContent>
                                    <BlogTitle>{blogPost.title}</BlogTitle>
                                    <BlogBody>{blogPost.body}</BlogBody>
                                </BlogContent>
                            </ContentWrapper>
                        </PostWrapper>
                    );
                })}
            </BlogContainer>
        </>
    );
};

export default Blog;
