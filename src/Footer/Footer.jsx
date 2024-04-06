import React from 'react';
import './Footer.css';

export function Footer ({OnAboutMeClick, OnLinkHoverLeft, OnLinkHoverRight, OnLinkHoverBoth, OnLinkHoverNot, leftHover, rightHover}){
    const rightScaleValue = rightHover ? 2 : 1;
    const leftScaleValue = leftHover ? 2 : 1;

    function ScrollToTheTop() {
        window.scrollTo(0, 0)
    }

    return (
        <footer>
            <address>
                <a id="emailButton"
                   className="footerLink"
                   href="mailto:i.p.yeremenko@gmail.com"
                   onMouseEnter={OnLinkHoverLeft}
                   onMouseLeave={OnLinkHoverNot}
                > Email </a>

                <p className="line"
                   style={{
                       transform: `scale(${leftScaleValue})`
                   }}
                >|</p>

                <a id="aboutMeButton"
                   className="footerLink"
                   onClick={() => {
                        OnAboutMeClick();
                        ScrollToTheTop();
                   }}
                   onMouseEnter={OnLinkHoverBoth}
                   onMouseLeave={OnLinkHoverNot}
                > About me </a>

                <p className="line"
                    style={{
                        transform: `scale(${rightScaleValue})`
                    }}
                >|</p>

                <a href="http://t.me/ivanopolus21"
                   className="footerLink"
                   id="telegramButton"
                   onMouseEnter={OnLinkHoverRight}
                   onMouseLeave={OnLinkHoverNot}
                > Telegram </a>
            </address>
        </footer>
    )
}


