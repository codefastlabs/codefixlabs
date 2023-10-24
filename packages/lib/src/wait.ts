export function wait(timeout = 1000): Promise<ReturnType<typeof setTimeout>> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(timer);
    }, timeout);
  });
}
