import './App.css';
import React from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import InviteModal from "./components/InviteModal/InviteModal";
import {useState} from "react";
import {COMPANY_NAME} from "./common/constant";

function App() {
    const [isModelShown, setIsModelShown] = useState(false);

    return (
        <div className="app">
            <Header title={COMPANY_NAME}/>
            <Content
                openInviteModal={() => {
                    setIsModelShown(true);
                }}
            />
            <Footer/>
            <InviteModal
                isShow={isModelShown}
                onClose={() => setIsModelShown(false)}
            />
        </div>
    );
}

export default App;
