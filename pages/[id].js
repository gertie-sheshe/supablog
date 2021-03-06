import { useEffect } from "react";
import supabase from "../utils/supabase";

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .eq("id", params.id)
    .single();

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      post,
    },
  };
}

const PostPage = ({ post }) => {
  useEffect(() => {
    const subscription = supabase
      .from("comments")
      .on("INSERT", (payload) => {
        console.log(payload);
      })
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, []);
  return (
    <div>
      <h1>{post?.title}</h1>
      <h2>{post?.content}</h2>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};

export default PostPage;
