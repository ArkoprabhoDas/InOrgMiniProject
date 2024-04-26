import Cookies from 'js-cookie';

// Set session cookie
const setSessionCookie = (userData) => {
  Cookies.set('session', userData, { expires: 1 }); // Expires in 1 day
};

// Get session cookie
const getSessionCookie = () => {
  const sessionCookie = Cookies.get('session');
  if (sessionCookie) {
    // Session cookie exists
    // console.log(JSON.parse(sessionCookie));
    return true;
  } else {
    // Session cookie does not exist
    return false;
  }
};

// Delete session cookie
const deleteSessionCookie = () => {
  Cookies.remove('session');
};

export { setSessionCookie, getSessionCookie, deleteSessionCookie };
