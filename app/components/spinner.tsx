import Image from "next/image";
import spinner from "public/spinner.svg"

const Spinner = () => {
  return ( 
    <div className="min-h-screen w-full grid place-items-center">
      <Image
        src={spinner}
        alt=""
      />
    </div>
   );
}
 
export default Spinner;