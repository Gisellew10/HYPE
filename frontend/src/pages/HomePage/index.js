import React from 'react';
import './style.css'
import HomeNav from '../../components/Home/HomeNav';

function Home() {
    return(
        <React.Fragment>
        <HomeNav/>
            <section>
                <video autoPlay="autoplay" muted loop id="myVideo">
                    <source src="/videos/background.mp4" type="video/mp4"/>
                </video>
                <div className="HomeContent">
                    <p id="title">Discover a boundless realm of innovative projects and unlock your true potential.</p>
                    <p id="subtitle">Connect ambitious individuals with a world of incredible internships and collaborative opportunities. </p>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Home;