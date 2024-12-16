//import CatPic from "../../components/CatPic"
import InputButton from "../../components/Input/InputButton"
import LoginPage from "../Auth/LoginPage"
// import { useCurrentView } from "./ViewProvider"
import { useState } from "react"
import addItems from "../../../public/assets/add-items-to-list.gif"
import share from "../../../public/assets/share-lists.gif"
import getDone from "../../../public/assets/get-done-faster.gif"

export default function LandingPage() {
    const [ tryTheApp, setTryTheApp ] = useState('no')
    return (
        <div >
            { tryTheApp === 'no' &&
            <div className="landing-page">
                <h1>QuickList</h1>
                <h2>Faster grocery shopping</h2>
                <p className="landing-page-text">Make lists</p>
                <img className="landing-page-gif" src={addItems} />
                <p className="landing-page-text">Share them</p>
                <img className="landing-page-gif" src={share} />
                <p className="landing-page-text">Finish faster</p>
                <img className="landing-page-gif" src={getDone} />
                <p>It's free!</p>
                <InputButton 
                    text="Try QuickList"
                    onClick={()=>setTryTheApp('yes')}
                />
            </div>
            }

            { (tryTheApp === 'yes') &&
                <LoginPage />
            }
        </div>
        
    )
}

// <li>Make lists for stores <i>Trader Joe's</i> or events <i>Dad's birthday</i></li>
// <li>Share with friends and family</li>
// <li>Easy to use while shopping</li>