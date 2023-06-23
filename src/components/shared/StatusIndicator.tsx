const StatusIndicator = () => {
  return (
    <ul
      role="list"
      className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
    >
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            <span className="w-2 h-2 mr-1 bg-green-500 rounded-full ml-2"></span>
            فعال
          </span>
        </div>
      </li>
    </ul>
  );
};

export default StatusIndicator;
