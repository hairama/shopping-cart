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
    const [ tempListName, setTempListName ] = useState('')
    const { user } = useAuth();
    const [ emailToShare, setEmailToShare ] = useState('')

    const listId = currentList.listId;
    const userId = user?.uid;
    const deleteListPath = `lists/${listId}`;
    const deleteUserList = `users/${userId}/shared_lists/${listId}`;

    const removeListFromLists = useFirebaseRemove(deleteListPath);
    const removeListFromUser = useFirebaseRemove(deleteUserList);

    function shareList(emailToShare: string) {
        console.log(`Totally gonna share this with ${emailToShare}`)
        setEmailToShare('')
    } 
    
    
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

    function changeListName() {
        setCurrentList(prevList => 
            {
                return {
                    ...prevList,
                    listName: tempListName
                }
            })
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
            <button>{currentList.listName}</button>
            <InputButton text="Delete List" onClick={askToConfirm} />
            <p>Change list name</p>
            <input
                type="text"
                id="input-field"
                placeholder={currentList.listName}
                value={tempListName}
                onChange={(e)=> setTempListName(e.target.value)}
            />
            <button id="add-button" 
                onClick={changeListName}>
                Save list name
            </button>
            <p>Share list</p>
            <input
                type="text"
                id="input-field"
                placeholder="Enter email"
                value={emailToShare}
                onChange={(e)=> setEmailToShare(e.target.value)}
            />
            <button id="add-button" 
                onClick={() => shareList(emailToShare)}
                >
                Share
            </button>
            <ul>
            </ul>
        </>
    );
}
