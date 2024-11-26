import CatPic from "../../components/CatPic";
import IconButton from "../../components/IconButton";
import ListOfLists from "./ListOfLists";
import InputField from "../../components/Input/InputField";
import InputButton from "../../components/Input/InputButton";
import createNewList from "./CreateNewList"
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";

// export interface NewListName {
//     newListName: string
//     setNewListName: React.Dispatch<React.SetStateAction<NewListName>>
// }



export default function HomePage() {
    const {user} = useAuth()
    const [ newListName, setNewListName ]= useState<string>("")

    return (
        <>
            <IconButton 
                view="login-page"
                iconUrl='../assets/circle-user-solid.svg'
            />
            <CatPic />
            <p>Add new list</p>
            <InputField 
                placeholder="Enter store or list name"
                value={newListName}
                onChange={(e)=> setNewListName(e.target.value)}
            />
            <InputButton 
                onClick={()=>createNewList(newListName, user !== null? user.uid: "none")}
                text="Create a new list"
            />
            <p>Lists</p>
            <ListOfLists
            />
        </>
    )
}