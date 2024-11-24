// Components
import CatPic from "../../components/CatPic";
import BackArrowButton from "../../components/BackArrowButton";
import IconButton from "../../components/IconButton";

export default function ListManagementPage() {

    return (
        <>
            <p>Start list management</p>
                <BackArrowButton 
                
                />
                <CatPic />
                <p>Change list name</p>
                <input 
                    type="text" 
                    id="input-field" 
                    placeholder="Trader Joes"
                    value={""}
                    onChange={()=> console.log("List name changed")}
                />
                <button 
                    id="add-button"
                    onClick={()=>console.log("adding List")}
                    >Save list name
                </button>
                <p>Share list</p>
                <input 
                    type="text" 
                    id="input-field" 
                    placeholder="Enter email"
                    value={""}
                    onChange={()=> console.log("List name changed")}
                />
                <button 
                    id="add-button"
                    onClick={()=>console.log("adding List")}
                    >Share
                </button>
                <ul>
                    <li>tony@baloney.com</li>
                    <li>priya.schwartz@aol.com</li>
                    <li>bezos@amazon.com</li>
                </ul>
        </>
    )
}