import React, { useState } from 'react';
import { UserMessages } from '../../../models/messages.models';

const MessagesItem: React.FC<UserMessages> = (props) => {
  const [isFullTextShown, setIsFullTextShown] = useState(false);
  const maxLength = 80;

  const handleMoreClick = () => {
    setIsFullTextShown(true);
  };

  const displayedText = isFullTextShown
    ? props.text
    : `${props.text.substring(0, maxLength)}...`;

  const shouldShowMoreButton =
    !isFullTextShown && props.text.length > maxLength;

  const textClass = props.visited
    ? 'text-black-400 seen'
    : 'text-blue-400 not-seen';

  return (
    <div className="flex gap-11 items-center border-b py-8 last:border-none">
      <div className="hidden sm:block">{/* SVG code */}</div>
      <div>
        <div className="flex mb-5 items-center">
          <p className="text-green-400 text-sm">در {props.createdAt}</p>
        </div>
        <div className="flex mb-5 items-center">
          <p className="text-black-400 font-bold">{props.title}</p>
        </div>
        <div className="flex mb-5 items-center">
          <p className={textClass}>{displayedText}</p>
          {shouldShowMoreButton && (
            <button onClick={handleMoreClick} className="text-blue-500">
              بیشتر
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesItem;
