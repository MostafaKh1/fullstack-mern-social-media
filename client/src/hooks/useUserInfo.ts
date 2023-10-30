import { useEffect, useState } from "react";
import { UserInterface } from "../typing";
import { UseAppSelector } from "../store";

function useUserInfo(userId: string) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const { token } = UseAppSelector((state) => state.user);

  const getUserDate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Decode ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getUserDate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
  };
}

export default useUserInfo;
