import React from 'react'
import "./Footer.css"

function Footer() {
    return (
        <div className="footer__main_container">
            <div className="footer__linkedin container">
                <div className="footer__linkedin link">
                    <a
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/in/nickfmatthews/"
                        target="_blank"
                    >
                        <div className="footer__linkedin text">
                            Nick Matthews
                        </div>
                        <div className="footer__linkedin icon">
                            <i className="fab fa-linkedin-in fa-md"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div className="footer__github container">
                <div className="footer__github link">
                    <a
                        rel="noopener noreferrer"
                        href="https://github.com/nappernick/envelope"
                        target="_blank"
                    >
                        <div className="footer__github text">
                            Envelope Github Repo
                        </div>
                        <div className="footer__github icon">
                            <i className="fab fa-github-alt fa-md"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div className="footer__readme container">
                <div className="footer__readme link">
                    <a
                        rel="noopener noreferrer"
                        href="https://github.com/nappernick/envelope/blob/master/README.md"
                        target="_blank"
                    >
                        <div className="footer__readme text">
                            Envelope README
                        </div>
                        <div className="footer__readme icon">
                            <i className="fab fa-readme fa-md"></i>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
