const prePath = '/select/'
const ROOT_PATH = prePath;
const LOGIN_PATH = prePath + 'login';
const BROWSE_PATH = prePath + 'browse';

const paths = {
  ROOT_PATH,
  LOGIN_PATH,
  BROWSE_PATH
} as const;

export default paths;
