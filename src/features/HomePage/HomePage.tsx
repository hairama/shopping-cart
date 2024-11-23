import CatPic from "../../components/CatPic";
import BackArrowButton from "../../components/BackArrowButton";
import IconButton from "../../components/IconButton";
import ListOfLists from "./ListOfLists";
import InputField from "../../components/Input/InputField";
import InputButton from "../../components/Input/InputButton";


export default function HomePage() {

    return (
        <>
            <BackArrowButton 
            />
            <IconButton 
            iconUrl='../assets/circle-user-solid.svg'
            />
            <CatPic />
            <p>Add new list</p>
            <InputField 
                placeholder="Enter store or list name"
                value=""
                onChange={()=>console.log("typing a new list name")}
            />
            <InputButton 
                onClick={()=>console.log("Add new list")}
                text="Add new list"
            />
            <p>Lists</p>
            <ListOfLists
            />
        </>
    )
}