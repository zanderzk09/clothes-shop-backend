import { Request, Response, NextFunction } from 'express';

export const validateFile = (req: Request, res: Response, next: NextFunction): void => {
  const hasFiles = req.files && Object.keys(req.files).length > 0 && req.files.file;

  if (!hasFiles) {
    res.status(400).json({
      success: false,
      msg: 'No files were uploaded - validateFile.',
    });
    return; 
  }

  next(); 
};



