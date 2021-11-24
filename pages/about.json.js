export default function About({ data }) {
  return(
    <div>
      { JSON.stringify(data) }
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch('http://localhost:8080/api/about')
  const data = await res.json();

  console.log(data)

  return {
    props: {
      data
    }
  }
}