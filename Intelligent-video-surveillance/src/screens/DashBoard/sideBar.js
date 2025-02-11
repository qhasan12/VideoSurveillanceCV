import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function SideBar() {

  return (
<div class="sideBar h-100 d-grid ps-4" >
          <div className='sidebar-menus pt-4'>
        <ul className='list-unstyled'>
          <li className='mb-3'>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.1665 10.6709C2.1665 8.76385 2.1665 7.81034 2.59917 7.0199C3.03184 6.22945 3.82229 5.73887 5.4032 4.75772L7.06986 3.72334C8.74099 2.68619 9.57656 2.16761 10.4998 2.16761C11.4231 2.16761 12.2587 2.68619 13.9298 3.72334L15.5965 4.75772C17.1774 5.73887 17.9678 6.22945 18.4005 7.0199C18.8332 7.81034 18.8332 8.76385 18.8332 10.6709V11.9384C18.8332 15.1892 18.8332 16.8145 17.8569 17.8244C16.8805 18.8343 15.3092 18.8343 12.1665 18.8343H8.83317C5.69047 18.8343 4.11913 18.8343 3.14281 17.8244C2.1665 16.8145 2.1665 15.1892 2.1665 11.9384V10.6709Z" stroke="black" stroke-width="1.5"/>
            <path d="M13 15.5009H8" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <Link className="ms-2 text-black text-decoration-none" to='/'>
              Home
            </Link>
          </li>
          <li className='mb-3'>
              <FontAwesomeIcon icon={faUser} />
            <Link className="ms-2 text-black text-decoration-none" to="/profile">
              My Profile
            </Link>
          </li>
          {/* <li className='mb-3'>
              <FontAwesomeIcon icon={faGear} />
            <Link className="ms-2 text-black text-decoration-none" to='/'>
              Settings
            </Link>
          </li> */}
          <li className='mb-3'>
              <FontAwesomeIcon icon={faVideo} to="/liveFootage"/>
            <Link className="ms-2 text-black text-decoration-none" to='/livefootage'>
              Recordings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
