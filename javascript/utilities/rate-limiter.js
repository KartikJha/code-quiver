const fixedWindowRateLimiter = new RateLimiter(50, 1000);



export class RateLimiter {

  userRateLimitConfigStore = new Map();

  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.rPMS = limit / windowMs;
  }
  
  isAllowed(userId) {
    if (!this.userRateLimitConfigStore.has(userId)) {
      this.userRateLimitConfigStore.set(userId, { count: 1, startTime: Date.now() })
    } else {
      const currTime = Date.now();
      const userConfig = 
      if (
    }
    return true;



  }

    


    // returns true if request is allowed, false if rate-limited
  }
}
