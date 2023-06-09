
const SDCard: React.FC<{children:React.ReactNode, className?: string}> = (props) => {
  return (
    <div className={`${props.className || ''}  block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 `}>
        {props.children}
    </div>
  );
};
export default SDCard;
