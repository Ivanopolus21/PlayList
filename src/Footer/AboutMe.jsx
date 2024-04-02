import './AboutMe.css';

export function AboutMe() {
    return (
        <div className="about_me_container">
            <p> Hey, my name is Ivan Yeremenko. I am in love with games, anime, programming and my girlfriend!
                On the React application you can find my first try to make a single page application using this
                framework. It is simple library of games that I know, where you can add them to your personal library
                and check if they are completed, currently played by you or they just multiplayer and don't have the
                term "completion". <br/>
                If you find any bugs or adjustments, feel free to write me by <a
                    className="textLink"
                    href = "mailto:i.p.yeremenko@gmail.com"
                >Email</a> or <a
                    className="textLink"
                    href = "t.me/ivanopolus21"
                >Telegram</a>.
                <br/>
                Have fun!
            </p>
        </div>
    )
}