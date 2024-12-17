import CatPic from "../../components/CatPic";
import IconButton from "../../components/IconButton";
import ListOfLists from "./ListOfLists";
import InputField from "../../components/Input/InputField";
import InputButton from "../../components/Input/InputButton";
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useCurrentList } from "./CurrentListProvider";
import { useFirebasePush, useFirebaseUpdate} from "../storage";

export default function HomePage() {
    const {user} = useAuth()
    const [ newListName, setNewListName ]= useState<string>("")
    const {setCurrentList} = useCurrentList()
    const profile = "./assets/circle-user-solid.svg"
    
    async function createNewList(newListName:string, uid:string) {
        setCurrentList({listId: "none", listName: "list name"})
        if (newListName !== null) {

            if (user !== null) {
                const pushData = useFirebasePush('lists', {
                    list_name: newListName,
                    owner_id: uid,
                    shared_with: {[uid]: {email: user.email, name: user.first_name}},
                    items: {}
                })
            
                const newListId:string | null | undefined = await pushData()
                
                if (newListId) {
                    const addListToUser = useFirebaseUpdate(`users/${uid}/shared_lists/`, {[newListId]: newListName})
                    addListToUser()

                }    
            }
        } 
        setNewListName("")
    }
    
    return (
        <>
            <div className="navHeaderFlexContainer">
                {user && <span>{user.first_name}</span>}
                <IconButton 
                    view="login-page"
                    iconUrl={profile}
                />
            </div>
            <CatPic />
            <InputField 
                placeholder="Enter store or list name"
                value={newListName}
                onChange={(e)=> setNewListName(e.target.value)}
            />
            <InputButton 
                onClick={()=>createNewList(newListName, user !== null? user.uid: "")}
                text="Create a new list"
            />
            <p>Lists</p>
            <ListOfLists
            />
        </>
    )
}