import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { queryAtom } from '../App';
import Logo from '../images/Logo.jpeg';

const Nav: React.FC = () => {
  const [query, setQuery] = useRecoilState(queryAtom);

  const view = useRecoilValue(queryAtom);
  const navigate = useNavigate();
  let name: string = '';
  let avatarUrl: string = '';

  if (localStorage.getItem('user')) {
    const user: string = localStorage.getItem('user') ?? '';
    avatarUrl = JSON.parse(user).avatarUrl ?? '';
    name = JSON.parse(user).name ?? '';
  }

  // read current route from window.location
  const currentRoute: string = window.location.pathname;

  // logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between h-[80px] px-2 bg-white mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div
          className={`w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start ${
            currentRoute === '/search' ? 'invisible' : ''
          }`}
        >
          <Link to="/search">
            <img src={Logo} alt="Divoora Logo" className="w-205 h-70" />
          </Link>
        </div>
        <div className={`flex items-center justify-center ${currentRoute === '/search' ? 'invisible' : ''}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // get input value
              const inputValue: string = query;
            }}
          >
            <input
              id="filter"
              className="w-[380px] h-[40px] border-2 rounded-[100px] px-3 border-solid border-secondary"
              type="text"
              defaultValue={view}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
          </form>
          <i className="fa fa-search relative -left-35 top-px text-primary cursor-pointer w-0"></i>
        </div>
        <div className="lg:flex items-center" id="example-navbar-danger">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <button className="px-3 py-2 flex items-center text-base font-normal text-heading hover:opacity-75">
                <div className="flex justify-end">
                  <div className="w-full">
                    {(avatarUrl && avatarUrl.length > 0) ? (<img src={avatarUrl} alt="avatar" className="shadow rounded-full w-12 h-12 align-left border-none" />) : null}
                  </div>
                </div>
                <div className="dropdown">
                  <span className="ml-2">{name}</span>
                  <div className="dropdown-content" onClick={() => logout()}>
                    <p>Logout</p>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
