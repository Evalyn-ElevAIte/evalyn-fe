import React from "react";
import { FileText, Clock, CheckCircle, Send, Edit } from "lucide-react";

const dummyActivities = [
  {
    day: "Today",
    type: "My Quizzes", // Corresponds to 'You created a new quiz:'
    status: "created",
    quizTitle: "Introduction to Philosophy",
    message: "Quiz created! Keep an eye on it regularly.",
    time: "2 hours ago",
    // actions: ["View Quiz"], // Removed actions array
  },
  {
    day: "Today",
    type: "Enrolled", // Corresponds to 'New submission:'
    status: "unfinished",
    quizTitle: "Mathematics Basics",
    message: "New quiz is out—make sure to complete it on time!",
    time: "6 hours ago",
    // actions: ["View Quiz"], // Removed actions array
  },
  {
    day: "Yesterday",
    type: "Enrolled", // Corresponds to 'You have submitted quiz:'
    status: "submitted",
    quizTitle: "Biology 101",
    message: "Your score is coming soon, hang tight!",
    time: "1 day ago",
    // actions: ["View Quiz"], // Removed actions array
  },
  {
    day: "Yesterday",
    type: "Enrolled", // Corresponds to 'Your submission has just been graded:'
    status: "graded",
    quizTitle: "Chemistry Fundamentals",
    message: "Sarah Johnson completed the quiz",
    time: "1 day ago",
    // actions: ["View Quiz"], // Removed actions array
  },
  {
    day: "Yesterday",
    type: "My Quizzes", // Corresponds to 'You created a new quiz:' (as per image)
    status: "done", // This status is used for the "All the participant already finish the quiz" message
    quizTitle: "Chemistry Fundamentals",
    message: "All the participant already finish the quiz",
    time: "1 day ago",
    // actions: ["View Quiz"], // Removed actions array
  },
];

const Activities = () => {
  // Group activities by day
  const grouped = dummyActivities.reduce((acc, curr) => {
    acc[curr.day] = acc[curr.day] || [];
    acc[curr.day].push(curr);
    return acc;
  }, {});

  // Function to determine icon, background color, and text based on activity status and type
  const getIconAndColor = (item) => {
    let iconComponent;
    let iconBgColorClass;
    let iconColorClass = "text-white"; // Default icon color is white
    let descriptionText;

    if (item.type === "My Quizzes") {
      if (item.status === "created") {
        iconComponent = <FileText size={48} />;
        iconBgColorClass = "bg-blue";
        descriptionText = "You created a new quiz:";
      } else if (item.status === "done") {
        iconComponent = <CheckCircle size={48} />;
        iconBgColorClass = "bg-green-500";
        descriptionText = "You created a new quiz:"; // As per image, this is also "You created a new quiz"
      }
    } else if (item.type === "Enrolled") {
      if (item.status === "unfinished") {
        iconComponent = <Clock size={48} />;
        iconBgColorClass = "bg-orange-500"; // Using orange for unfinished/new submission
        descriptionText = "New submission:";
      } else if (item.status === "submitted") {
        iconComponent = <Send size={42} />;
        iconBgColorClass = "bg-purple-500"; // Using purple for submitted
        descriptionText = "You have submitted quiz:";
      } else if (item.status === "graded") {
        iconComponent = <CheckCircle size={48} />;
        iconBgColorClass = "bg-green-500";
        descriptionText = "Your submission has just been graded:";
      }
    }

    return {
      icon: iconComponent,
      iconBgColor: iconBgColorClass,
      iconColor: iconColorClass,
      description: descriptionText,
    };
  };

  return (
    <div className="font-sans">
      <div className="bg-blue-50 px-6 py-12 rounded-t-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Recent Activity
        </h2>
        <p className="text-sm text-gray-600">
          Track your latest actions, including unfinished, submitted, and graded
          submissions.
        </p>
      </div>
      <div className="flex items-center justify-start gap-4 px-4 py-4 bg-white rounded-b-lg shadow-sm">
        <div className="relative">
          <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm">
            <option>All Activities</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Select date range"
            className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="px-4 py-6">
        {Object.entries(grouped).map(([day, items]) => (
          <div key={day} className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">{day}</h3>
            <div className="flex flex-col gap-4">
              {items.map((item, index) => {
                const { icon, iconBgColor, iconColor, description } =
                  getIconAndColor(item);
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                  >
                    <div className="flex items-start flex-grow">
                      <div
                        className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center mr-4 ${iconBgColor} ${iconColor}`}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-base leading-tight">
                          {description}{" "}
                          <span className="text-black font-bold">
                            {item.quizTitle}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-end md:items-center gap-2 mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                      <button className="text-blue hover:text-blue-200 cursor-pointer text-sm font-medium px-2 py-1 rounded transition-colors duration-200">
                        View Quiz
                      </button>
                      <span className="text-xs text-gray-400 md:ml-4 whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default Activities;
