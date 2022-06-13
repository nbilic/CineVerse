import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import { setUser } from "../redux/user";
import reqConstants from "../api/reqConstants";

export default function useManageFriends() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { ADD, REM, CHECK_ADDED, CHECK_FRIENDS, CANCEL, ACCEPT, DENIE } =
    reqConstants;

  const addFriend = async (receiver) => {
    try {
      const response = await api.put(`/api/user/addfriend`, {
        receiverId: receiver._id,
        senderId: user._id,
      });
      await dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const removeFriend = async (receiver) => {
    try {
      const response = await api.delete(`/api/user/removefriend`, {
        params: { removedId: receiver._id, removerId: user._id },
      });
      await dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const manageRequests = async (receiver, decision) => {
    try {
      const response = await api.put("/api/user/managerequests", {
        receiverId: receiver._id,
        senderId: user._id,
        decision: decision,
      });
      await dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  const checkIfAdded = (profile) =>
    user?.outgoingRequests?.find((u) => u === profile?._id);

  const checkIfFriends = (receiver) =>
    user.friends?.some((r) => r === receiver?._id);

  const manageFriends = async (action, profile) => {
    switch (action) {
      case ADD:
        addFriend(profile);
        break;
      case REM:
        removeFriend(profile);
        break;
      case CANCEL:
        manageRequests(profile, CANCEL);
        break;
      case ACCEPT:
        manageRequests(profile, ACCEPT);
        break;
      case DENIE:
        manageRequests(profile, DENIE);
        break;
      case CHECK_FRIENDS:
        return checkIfFriends(profile);
      case CHECK_ADDED:
        return checkIfAdded(profile);

      default:
        break;
    }
  };

  return manageFriends;
}
