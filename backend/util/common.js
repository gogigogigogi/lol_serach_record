function parseCookies(cookies) {
  const cookieObject = {};
  if (cookies) {
    cookies.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      cookieObject[parts[0].trim()] = parts[1] && parts[1].trim();
    });
  }
  return cookieObject;
}

module.exports = { parseCookies };
