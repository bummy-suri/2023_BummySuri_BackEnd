

type AsyncFunction<T, U> = (data: T) => Promise<U>;

export const withTimeout = async <T, U>(
    fn: AsyncFunction<T, U>,
    data: T,
    timeout: number
  ): Promise<U> => {
    // Create a new Promise that rejects after `timeout` milliseconds
    const timer = new Promise<U>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error(`Timed out after ${timeout} ms`));
      }, timeout);
    });
  
    // Race the function against the timer
    return Promise.race([
      fn(data),
      timer,
    ]);
  }