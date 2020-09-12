import App from "../components/App";

import Layout from "../components/Layout";

export default function Home({ notesData, tasksData }) {
  return (
    <Layout>
      <App notes={notesData} tasks={tasksData} />
    </Layout>
  );
}

// Initial props
export async function getServerSideProps(context) {
  //const baseUrl = "http://localhost:3000";
  const baseUrl = process.env.HOST_URL;

  try {
    //Fetch is now build into nextjs
    const resNotes = await fetch(baseUrl + "/api/notes");
    const { notesData } = await resNotes.json();
    const resTasks = await fetch(baseUrl + "/api/tasks");
    const { tasksData } = await resTasks.json();

    return {
      props: { notesData, tasksData },
    };
  } catch (error) {
    console.error(error);
  }
}
