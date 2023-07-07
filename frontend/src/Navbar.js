import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-1/7 flex w-full z-50 top-0 fixed bg-redd">
      <div className="w-1/2">
        <li className="flex text-white hover:text-darkbg py-2">
          <ul className="px-5">
            <Link to="/posts/all" className="text-white hover:text-darkbg">
              <h2 className="text-2xl font-bold">Home</h2>
            </Link>
          </ul>
          <ul className="px-5">
            <Link
              to="/profile"
              className="text-white hover:text-darkbg">
              < h2 className="text-2xl font-bold">Profile</ h2>
            </Link>
          </ul>
          <ul className="px-5">
            <Link
              to="/posts/addpost"
              className="text-white hover:text-darkbg">
              < h2 className="text-2xl font-bold">AddPost</ h2>
            </Link>
          </ul>
        </li>
      </div>
      <div className='w-1/2 grid justify-items-end'>
        <li className="flex text-white hover:text-darkbg py-2">
          <ul className="px-5">
            <Link to="/" className="text-white hover:text-darkbg">
              < h2 className="text-2xl font-bold">Logout</ h2>
            </Link>
          </ul>
        </li>
      </div>
    </div>
  );
}
