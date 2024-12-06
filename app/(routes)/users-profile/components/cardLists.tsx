import { useEffect, useState } from "react";
import Card from "./card";
import axios, { AxiosResponse } from "axios";
import { UserProps } from "app/constants";


const CardList = () => {
  const [data, setData] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<UserProps[]> = await axios.get('https://random-data-api.com/api/users/random_user?size=10');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>

  return (
    <div className="flex justify-center flex-wrap">
      {data.length > 0 ? ( 
        data.map((user: UserProps) => (
          <Card key={user.id} user={user} />
        ))
      ) : (
        <p>No users found.</p> 
      )}
    </div>
  );
};

export default CardList