import { Request, Response, NextFunction } from 'express';
import basicAuth from 'basic-auth';

// Basic authentication middleware that checks if the user is authenticated
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = basicAuth(req);

  if (!user || user.name !== 'admin' || user.pass !== 'secret') {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send('Authentication required.');
  }

  next();
};

export { checkAuth };
