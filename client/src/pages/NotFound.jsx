
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="bg-red-200 p-2 skew-x-20">Chla ja bhai wapis chla ja, Ghalat rastay pay a gya hy tu</p>
      <Link to="/home" className="bg-green-300 m-3 p-2 rounded-full">Wapis jany ka rasta</Link>
    </div>
  );
}

export default NotFound;