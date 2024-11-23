import CatPic from "../../components/CatPic";
import BackArrowButton from "../../components/BackArrowButton";
import IconButton from "../../components/IconButton";
import ListOfLists from "./ListOfLists";


export default function HomePage() {

    return (
        <>
            <p>Home Page start</p>
            <BackArrowButton 
            />
            <IconButton 
            iconUrl='../assets/circle-user-solid.svg'
            />
            <CatPic />
            
            <ListOfLists
            />

            <p>Home Page end</p>
        </>
    )
}