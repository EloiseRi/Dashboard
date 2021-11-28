import { withPageAuthRequired  } from "@auth0/nextjs-auth0";
import Navigation from '../components/navigation.js';

const Index = ({ user }) => {

  return (
    <>
      <Navigation {...user} />
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Index;