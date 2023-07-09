import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { userType, ticketType } from "../../../models/usermanagement.models";
import SDSpinner from "../../shared/Spinner";

type UserType = userType["title"];
type UserTicket = ticketType["title"];

interface AssignTicketTypes {
  userTypeId: string;
  ticketTypes: string[];
}

const UserTypeSettings: React.FC = () => {
  const { sendRequest, isPending } = useApi<null, BaseResponse<userType[]>>();
  const { sendRequest: sendPostRequest, isPending: inPendingPost } = useApi<
    AssignTicketTypes,
    BaseResponse<null>
  >();
  const [selectedUserTypes, setSelectedUserTypes] = useState<UserType[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<{
    [key in UserType]: UserTicket[];
  }>({
    "همراه با مربی": [],
    آزاد: [],
    ویژه: [],
  });
  const [userTypes, setUserTypes] = useState<userType[]>([]);
  const [isOpen, setIsOpen] = useState<{ [key in UserType]: boolean }>({
    "همراه با مربی": false,
    آزاد: false,
    ویژه: false,
  });

  useEffect(() => {
    sendRequest(
      {
        url: "/UserTypes",
      },
      (response) => {
        if (response?.content.length > 0) {
          setUserTypes(response.content);

          const initialSelectedTickets: {
            [key in UserType]: UserTicket[];
          } = {
            "همراه با مربی": [],
            آزاد: [],
            ویژه: [],
          };

          response?.content.forEach((userType) => {
            initialSelectedTickets[userType.title] =
              userType.allowedTicketTypes.map(
                (ticketType) => ticketType.title
              ) || [];
          });

          setSelectedTickets(initialSelectedTickets);
        }
      }
    );
  }, [sendRequest]);

  const handleUserTypeClick = (userType: UserType) => {
    if (selectedUserTypes.includes(userType)) {
      setSelectedUserTypes(
        selectedUserTypes.filter((type) => type !== userType)
      );
    } else {
      setSelectedUserTypes([...selectedUserTypes, userType]);
    }

    setIsOpen((prevState) => ({
      ...prevState,
      [userType]: !prevState[userType],
    }));
  };

  const handleAddTicket = (userType: UserType, ticket: UserTicket) => {
    const userTypeObj = userTypes.find((u) => u.title === userType);

    if (userTypeObj) {
      const ticketObj = userTypeObj.allowedTicketTypes.find(
        (ticketType) => ticketType.title === ticket
      );

      if (ticketObj) {
        const assignTicketTypes: AssignTicketTypes = {
          userTypeId: userTypeObj.id,
          ticketTypes: [ticketObj.id],
        };

        sendPostRequest(
          {
            url: "/UserTypes/AssignTicketType",
            method: "post",
            data: assignTicketTypes,
          },
          (response) => {
            toast.success(response.message);
          },
          (error) => {
            toast.error(error?.message);
          }
        );
      }
    }
  };

  const handleRemoveTicket = (userType: UserType, ticket: UserTicket) => {
    setSelectedTickets((prevState) => {
      const updatedTickets = { ...prevState };
      updatedTickets[userType] = prevState[userType].filter(
        (t) => t !== ticket
      );
      return updatedTickets;
    });
  };

  const allowedTicketTypes: { [key in UserType]: UserTicket[] } = {
    "همراه با مربی": ["همراه با مربی", "آزاد", "چارتر", "ویژه"],
    آزاد: ["همراه با مربی", "آزاد", "چارتر", "ویژه"],
    ویژه: ["همراه با مربی", "آزاد", "چارتر", "ویژه"],
  };

  if (isPending) {
    return (
      <div className="flex justify-center pt-6 w-full">
        <SDSpinner size={20} />
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {userTypes.map((userType) => (
          <li
            key={userType.title}
            className={`flex flex-col ${
              selectedUserTypes.includes(userType.title)
                ? "bg-black-200 text-blue-600"
                : "bg-white"
            }`}
            style={{
              border: "1px solid gray",
              borderRadius: "0.5rem",
              transition: "background-color 0.3s",
            }}
          >
            <button
              className={`p-4 text-lg font-bold w-full text-right flex items-center ${
                selectedUserTypes.includes(userType.title)
                  ? "text-blue-600"
                  : ""
              }`}
              onClick={() => handleUserTypeClick(userType.title)}
              style={{
                transition: "color 0.3s",
              }}
            >
              <div className="flex items-center">
                {isOpen[userType.title] ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                )}
                <span className="ml-2">{userType.title}</span>
              </div>
            </button>

            {selectedUserTypes.includes(userType.title) && (
              <ul className="space-y-2 p-4">
                {allowedTicketTypes[userType.title] &&
                  allowedTicketTypes[userType.title].map((ticketType) => (
                    <li
                      key={ticketType}
                      className={`flex items-center ${
                        selectedTickets[userType.title] &&
                        selectedTickets[userType.title].includes(ticketType)
                          ? "text-black"
                          : "text-black"
                      }`}
                    >
                      <span
                        className={`px-2 ml-4 py-1 rounded-md ${
                          selectedTickets[userType.title] &&
                          selectedTickets[userType.title].includes(ticketType)
                            ? "bg-green-200"
                            : "bg-white"
                        }`}
                      >
                        {ticketType}
                      </span>
                      {!selectedTickets[userType.title]?.includes(
                        ticketType
                      ) && (
                        <button
                          className="px-2 py-1 rounded-md bg-green-200 ml-2 flex items-center"
                          onClick={() =>
                            handleAddTicket(userType.title, ticketType)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                          <span className="ml-2">
                            {inPendingPost && <SDSpinner color="blue" />}
                            افزودن
                          </span>
                        </button>
                      )}
                      {selectedTickets[userType.title]?.includes(
                        ticketType
                      ) && (
                        <button
                          className={`px-2 py-1 rounded-md bg-red-200 ml-2 flex items-center ${
                            selectedTickets[userType.title]?.includes(
                              ticketType
                            )
                              ? "text-black"
                              : ""
                          }`}
                          onClick={() =>
                            handleRemoveTicket(userType.title, ticketType)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 12h-15"
                            />
                          </svg>
                          <span className="ml-2">حذف</span>
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserTypeSettings;
