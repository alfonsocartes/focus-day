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
  try {
    //Fetch is now build into nextjs
    const resNotes = await fetch("http://localhost:3000/api/notes");
    const { notesData } = await resNotes.json();
    const resTasks = await fetch("http://localhost:3000/api/tasks");
    const { tasksData } = await resTasks.json();

    return {
      props: { notesData, tasksData },
    };
  } catch (error) {
    console.error(error);
  }
}
