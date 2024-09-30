import { HttpInterceptorFn } from '@angular/common/http';

export const medicineInterceptor: HttpInterceptorFn = (req, next) => {
  let token = "NAQ5XNukAVMPGdbJkjJcMUK9DyYBeTpu";
  let cloneReq = req.clone({
    setHeaders: {
      apikey: token
    }
  });
  return next(cloneReq);
};
