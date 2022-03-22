import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { queryAtom } from '../App';
import Button from '../components/button';
import Nav from '../components/nav';
import Logo from '../images/Logo.jpeg';
import { fetchUserInfo, fetchAccessToken } from '../network/calls';

const SearchPage: React.FC = () => {
  const code: string | undefined = window.location.href.split('code=').pop();
  const [query, setQuery] = useRecoilState(queryAtom);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleToken = async () => {
      const data = await fetchAccessToken(code);
      const { access_token } = await data.data;

      if (access_token) {
        localStorage.setItem('token', access_token);
        await fetchUserInfo(access_token);
      }
    };

    if (code) handleToken();
  }, [code]);

  const sumbitSearch = () => {
    if (query === '') {
      setShowMessage(true);
      return;
    } else {
      setShowMessage(false);
    }

    navigate('/result');
  };

  return (
    <div className="h-screen">
      <Nav />
      <div className="flex justify-center items-center top-20 relative mx-auto">
        <div>
          <div className="flex justify-center">
            <img src={Logo} alt="Logo" className="w-205 h-70 mb-4" />
          </div>
          <div>
            <input id="filter" onChange={(e) => setQuery(e.target.value)} className="w-580 h-50 px-3 border-2 rounded-[100px] border-solid border-secondary" type="text" />
            <i className="fa fa-search relative -left-35 top-px text-primary cursor-pointer w-0"></i>
          </div>
          {(query === '' && showMessage) && <small className='flex justify-center text-primary py-3'>This field required</small>}
          <div className="flex justify-center pt-3">
            <Button
              text="Search Restaurant"
              onClick={sumbitSearch}
              className="text-white text-center bg-primary w-40 h-[40px] rounded-[5px] text-base font-bold font-sans hover:bg-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
