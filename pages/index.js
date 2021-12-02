import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

import Hero from "../components/Hero";
import Content from "../components/Content";
import Dashboard from "../components/Dashboard";

export default function Index({ widgetsFromDB }) {
  const { user, isLoading } = useUser();

  widgetsFromDB = JSON.parse(widgetsFromDB);

  return (
    <>
      {!isLoading && user && (
        <div>
          <Dashboard widgets={widgetsFromDB} />
        </div>
      )}
      {!user && (
        <div>
          <Hero />
          <hr />
          <Content />
        </div>
      )}
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const response = await fetch("http://localhost:8080/api/widgets/fetch", {
      headers: { Cookie: ctx.req.headers.cookie },
    });
    const formatted = await response.json();

    return {
      props: {
        widgetsFromDB: JSON.stringify(formatted),
      },
    };
  },
});
