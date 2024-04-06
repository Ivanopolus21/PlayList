import './AboutMe.css';

export function AboutMe() {
    return (
        <div className="about_me_container">
            <p> Hey, my name is Ivan Yeremenko. I am in love with games, anime, programming and my girlfriend! <br/>
                On the website you can find my first try to make a Single Page Application using React.
                The website is a simple list of games, which you can add to your personal library
                and set their state as "completed", "currently playing" and so on. <br/>
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