export default function About({ data }) {
  return(
    <pre>
      {JSON.stringify(data, undefined, 2)}
    </pre>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch('http://localhost:8080/api/about')
  const data = await res.json()
  return {
    props: {
      data: data
    }
  }
}