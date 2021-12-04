export default function About({ data, host }) {
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
}

export const getServerSideProps = async (context) => {
  const host = context.req.headers["host"];
  const res = await fetch("http://localhost:8080/api/about");
  const data = await res.json();
  return {
    props: {
      data: data,
      host: host
    },
  };
};
