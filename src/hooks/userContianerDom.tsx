export function useUserContainerDom() {
  console.log('hook')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const container = document.getElementById("userMainContainer")! as HTMLDivElement;
//   useEffect(() => {
//     container = document.getElementById("userMainContainer")! as HTMLDivElement;
//   }, []);

  return container
}
