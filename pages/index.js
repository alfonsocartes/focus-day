import useSWR from "swr";
import App from "../components/App";
import Layout from "../components/Layout";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data: data, error: error } = useSWR("/api", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <App notes={data.notes} tasks={data.tasks} />
    </Layout>
  );
}
