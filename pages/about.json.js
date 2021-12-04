export default function About({ data }) {
  let currentDate = new Date()
  let data =
  {
    "client": {
      "host": RemoteAddr
    },
    "server": {
      "current_time": currentDate,
      "services": [{
        "name": "weather",
        "widgets": [{
          "name": "Wheater",
          "description": "Display temperature of the chosen city",
          "params": [{
            "name": "city",
            "type": "string",
          }, {
            "name": "type",
            "type": "string",
          }]
        }]
      }, {
        "name": "clock",
        "widgets": [{
          "name": "Clock",
          "description": "Displaying the time of the chosen city",
          "params": [{
            "name": "continent",
            "type": "string "
          }, {
            "name": "country",
            "type": "string"
          }]
        }]
      }, {
        "name": "crypto",
        "widgets": [{
          "name": "crypto",
          "description": "Displaying the informations of the chosen crypto",
          "params": [{
            "name": "pair",
            "type": "string"
          }, {
            "name": "refrashData",
            "type": "number"
          }]
        },]
      }, {
        "name": "movies",
        "widgets": [{
          "name": "Movies",
          "description": "Displaying the popular, upcoming, top rated and in theaters now movies.",
          "params": [{
            "name": "type",
            "type": "string"
          }]
        }]
      }, {
        "name": "spotify",
        "widgets": [{
          "name": "Spotify",
          "description": "",
          "params": [{
            "name": "",
            "type": ""
          }]
        }]
      },
      ]
    }
  };
  return (
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