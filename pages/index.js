import styles from "../styles/Home.module.css";
import supabase from "../utils/supabase";

export async function getStaticProps() {
  const { data: posts, error } = await supabase.from("posts").select("*");

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <h1>Hello Chat</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
