import CatPic from "../../components/CatPic"
import InputButton from "../../components/Input/InputButton"
import LoginPage from "../Auth/LoginPage"
// import { useCurrentView } from "./ViewProvider"
import { useState } from "react"

export default function LandingPage() {
    const [ tryTheApp, setTryTheApp ] = useState('no')
    return (
        <div >
            { tryTheApp === 'no' &&
            <div className="landing-page">
                <h1>QuickList</h1>
                <h2>Spend less time grocery shopping</h2>
                <CatPic />
                <InputButton 
                    text="Try the app"
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