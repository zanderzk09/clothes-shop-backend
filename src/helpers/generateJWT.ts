import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string = ''): Promise<string> => {

  return new Promise((resolve, reject) => {
    
    const payload = { uid };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY as string, {

    }, (err, token) => {
      if (err) {
        console.error(err); 
        reject('Could not generate JWT');
      } else {
        resolve(token as string);
      }
    });
  });
};


