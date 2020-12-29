export function getRequestsInformation() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({}, 3000);
    });
  });
}
