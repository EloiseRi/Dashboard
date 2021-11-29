import React from "react";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

import Hero from "../components/Hero";
import Content from "../components/Content";
import Dashboard from "../components/Dashboard";

export default function Index({ widgets }) {
  const { user, isLoading } = useUser();
  widgets = JSON.parse(widgets)

  return (
    <>
      {!isLoading && user && (
        <div>
          <Dashboard widgets={widgets} />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await fetch("http://localhost:8080/api/widgets/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "test", auth: false }),
              });
            }}
          >
            Add mes couilles
          </button>
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
        widgets: JSON.stringify(formatted),
      },
    };
  },
});
