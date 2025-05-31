// src/pages/tabs/PeopleTab.jsx
import React, { useEffect, useState } from "react";
// import { getPeopleList } from "../../services/quiz";
import LoadingScreen from "../../components/LoadingScreen";

const PeopleTab = ({ quizId, status }) => {
  // const [people, setPeople] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPeople = async () => {
  //     try {
  //       // const response = await getPeopleList(quizId);
  //       // if (response.status === 200) {
  //       //   setPeople(response.data);
  //       // }
  //     } catch (error) {
  //       console.error("Failed to load people list:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPeople();
  // }, [quizId]);

  // if (loading) return <LoadingScreen />;

  // Teacher view
  if (status === "published" || status === "done") {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Participants</h3>
        <ul className="space-y-2">
          {people.map((person) => (
            <li
              key={person.id}
              className="border p-3 rounded-lg shadow-sm flex justify-between items-center"
            >
              <span>{person.name}</span>
              <span className="text-sm text-gray-500">{person.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Participant view
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Other Participants</h3>
      <ul className="space-y-2">
        {people.map((person) => (
          <li key={person.id} className="border p-3 rounded-lg shadow-sm">
            {person.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleTab;
