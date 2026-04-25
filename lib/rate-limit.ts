interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export async function rateLimit(identifier: string, limit: number = 100, windowMs: number = 60 * 1000) {
  const now = Date.now();
  
  if (!store[identifier]) {
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true, count: 1, remaining: limit - 1 };
  }

  const record = store[identifier];

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return { success: true, count: 1, remaining: limit - 1 };
  }

  record.count++;
  
  if (record.count > limit) {
    return { success: false, count: record.count, remaining: 0 };
  }

  return { success: true, count: record.count, remaining: limit - record.count };
}
