import { UserProps } from "app/constants";


interface CardProps {
  user: UserProps
}

const Card = ({ user } : CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md m-2 p-5 w-72 text-center">
      <img className="rounded-full w-24 h-24 mb-2" src={user.avatar} alt={user.username} />
      <div className="info">
        <h2 className="mb-1">{user.first_name} {user.last_name}</h2>
        <p className="mb-2">{user.email}</p>
        <p>{user.address.city}, {user.address.state}</p>
      </div>
    </div>
  );
};

export default Card;