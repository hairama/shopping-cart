import CatPic from "../../components/CatPic";
import BackArrowButton from "../../components/BackArrowButton";
import MessageModal from "../../components/MessageModal";
import InputButton from "../../components/Input/InputButton";
import { useState } from "react";
import { useFirebaseRemove, useFirebaseUpdate } from "../storage";
import { useCurrentView } from "../HomePage/ViewProvider";
import { useCurrentList } from "../HomePage/CurrentListProvider";
import { useAuth } from "./ShoppingContextProvider";
import { checkForAccount } from "../Auth/CheckForAccount";
import { useListUsers } from "../storage/useFirebaseData";
//import { updateCurrentUser } from "firebase/auth";
//import { FirebaseListUser } from "../storage/useFirebaseData";

export default function ListManagementPage() {
    const { setCurrentView } = useCurrentView();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { currentList, setCurrentList } = useCurrentList();
    const [ tempListName, setTempListName ] = useState('')
    const { user } = useAuth();
    const [ emailToShare, setEmailToShare ] = useState('')
    //const [ sharedUsersList, setSharedUsersList ] = useState()

    const listId = currentList.listId;
    const userId = user?.uid;
    const userEmail = user?.email
    const deleteListPath = `lists/${listId}`;
    const deleteUserList = `users/${userId}/shared_lists/${listId}`;

    const removeListFromLists = useFirebaseRemove(deleteListPath);
    const removeListFromUser = useFirebaseRemove(deleteUserList);

    const renameListForUser = useFirebaseUpdate(`/users/${userId}/shared_lists/`, {[listId]: tempListName})
    const renameListForLists = useFirebaseUpdate(`/lists/${listId}`, {list_name: tempListName})
    
    const sharedUserList = useListUsers(listId).data

    async function shareList(emailToShare: string) {
        console.log(`Checking if account exists for email: ${emailToShare}`);
        if (!emailToShare) {
          console.log("Please enter an email address.");
          return;
        }
      
        try {
          const result = await checkForAccount(emailToShare);
          if (result.exists) {
            const sharedUserId = result.uid
            const sharedUserName = result.name
            const currentListName = currentList.listName
            const currentListID = currentList.listId
            const shareListWithUser = useFirebaseUpdate(`users/${sharedUserId}/shared_lists/`, {[currentListID]: currentListName})
            if (sharedUserId) {
                const addSharedUserToList = useFirebaseUpdate(`lists/${listId}/shared_with`, 
                    {[sharedUserId]: 
                        {
                            email: emailToShare,
                            first_name: sharedUserName
                        }
                    }
                )
                addSharedUserToList()
            }
            
            shareListWithUser()
            
            console.log(`Sharing list with: ${result.name} (UID: ${result.uid})`);
            // Add logic to share the list with the UID
          } else {
            console.log("No account found for email:", emailToShare);
          }
        } catch (error) {
          console.error("Error sharing list:", error);
        } finally {
          setEmailToShare('');
        }
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
            renameListForUser()
            renameListForLists()
        setCurrentList(prevList => 
            {
                return {
                    ...prevList,
                    listName: tempListName
                }
            })
    }
   
    function removeFromSharing(uid: string) {
        console.log(`removing ${uid} from sharing`)
        const deleteSharedUserList = `users/${uid}/shared_lists/${listId}`;
        const removeListFromUser = useFirebaseRemove(deleteSharedUserList);
        removeListFromUser()
        const deleteUserFromSharedList = `lists/${listId}/shared_with/${uid}`
        const removeListFromList = useFirebaseRemove(deleteUserFromSharedList)
        renderSharedUsers()
        removeListFromList()
    }
    
    let sharedUserElements: any = ''
    
    function renderSharedUsers() {
        if(sharedUserList)
        try {
            sharedUserList

            sharedUserElements = sharedUserList?.map((user) => {
                if ( user.email !== userEmail ) {
                    return (
                        <li className="shared-list-user flex">
                            <p>{user.email}</p>
                            <img 
                                className="icon-button"
                                src="./public/assets/trash-can-solid.svg" 
                                onClick={()=>removeFromSharing(user.id)}
                            />
                        </li>)
                }
                
            })
        } catch (error) {
            console.error("Error deleting list: ", error);
        } 
        
    }
      
    renderSharedUsers()
    
    

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
            <div className="list-name-and-cat-container">
              <CatPic />
              <button className="store-name-button">{currentList.listName}</button>
            </div>
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
              {sharedUserElements}
            </ul>
        </>
    );
}
