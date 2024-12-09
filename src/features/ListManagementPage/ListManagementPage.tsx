import CatPic from "../../components/CatPic";
import BackArrowButton from "../../components/BackArrowButton";
import MessageModal from "../../components/MessageModal";
import InputButton from "../../components/Input/InputButton";
import { useState } from "react";
import { useFirebaseRemove } from "../storage";
import { useCurrentView } from "../HomePage/ViewProvider";
import { useCurrentList } from "../HomePage/CurrentListProvider";
import { useAuth } from "./ShoppingContextProvider";

export default function ListManagementPage() {
    const { setCurrentView } = useCurrentView();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { currentList, setCurrentList } = useCurrentList();
    const { user } = useAuth();

    const listId = currentList.listId;
    const userId = user?.uid;
    const deleteListPath = `lists/${listId}`;
    const deleteUserList = `users/${userId}/shared_lists/${listId}`;

    const removeListFromLists = useFirebaseRemove(deleteListPath);
    const removeListFromUser = useFirebaseRemove(deleteUserList);

    function askToConfirm() {
        setIsConfirmed((oldValue) => !oldValue);
    }

    async function confirmDeleteList() {
        console.log("confirmDeleteList called");
    
        try {
            await removeListFromLists();
            console.log("removeListFromLists called");
            await removeListFromUser();
            console.log("removeListFromUser called");
            setCurrentList({ listId: "", listName: "" });
            setCurrentView("home-page");
        } catch (error) {
            console.error("Error deleting list: ", error);
        } 
    }

    

    const message = `Are you sure you want to delete this list?
                     This action cannot be undone.`;

    return (
        <>
            {isConfirmed && (
                <MessageModal
                    message={message}
                    buttonOneText="Delete List"
                    buttonOneOnClick={confirmDeleteList}
                    buttonTwoText="Cancel"
                    buttonTwoOnClick={askToConfirm}
                />
            )}
            <BackArrowButton view={"shop-page"} />
            <CatPic />
            <InputButton text="Delete List" onClick={askToConfirm} />
            <p>Change list name</p>
            <input
                type="text"
                id="input-field"
                placeholder="Trader Joes"
                value={""}
                onChange={() => console.log("List name changed")}
            />
            <button id="add-button" onClick={() => console.log("adding List")}>
                Save list name
            </button>
            <p>Share list</p>
            <input
                type="text"
                id="input-field"
                placeholder="Enter email"
                value={""}
                onChange={() => console.log("List name changed")}
            />
            <button id="add-button" onClick={() => console.log("adding List")}>
                Share
            </button>
            <ul>
                <li>tony@baloney.com</li>
                <li>priya.schwartz@aol.com</li>
                <li>bezos@amazon.com</li>
            </ul>
        </>
    );
}
