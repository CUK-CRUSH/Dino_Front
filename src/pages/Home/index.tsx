import { useQuery, gql } from "@apollo/client";
import LoadingPage from "@pages/loading";

interface Location {
  id: string;
  name: string;
  description: string;
  photo: string;
}

interface LocationsData {
  locations: Location[];
}

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery<LocationsData>(GET_LOCATIONS);

  if (loading) return <LoadingPage />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {/* GraphQL 예시(공식문서 참고) */}
      {data?.locations.map(({ id, name, description, photo }) => (
        <div key={id}>
          <h3>{name}</h3>
          <img className="w-[400px] h-[250px]" alt={name} src={`${photo}`} />
          <br />
          <b>About this location:</b>
          <p>{description}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Home;
