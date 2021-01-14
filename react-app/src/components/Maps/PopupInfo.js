import React from 'react'

function PopupInfo({ popUpInfo }) {
    const { latitude, longtitude, administered, duration, enumerator, dont_knows, outliers, respondent } = popUpInfo
    return (
        <>
            <div width={240} height={240} className="popup_info__container">
                <div className="popup_info__enumerator header">
                    Enumerator Code: #{enumerator}
                </div>
                <div className="popup_info__details container">
                    <div className="popup_info__administered">
                        <div className="popup_info__administered title">
                            Administered
                        </div>
                        <div className="popup_info__administered detail">
                            {administered}
                        </div>
                    </div>
                    <div className="popup_info__respondent">
                        <div className="popup_info__respondent title">
                            Respondent
                        </div>
                        <div className="popup_info__respondent detail">
                            {respondent}
                        </div>
                    </div>
                    <div className="popup_info__duration">
                        <div className="popup_info__duration title">
                            Duration
                        </div>
                        <div className="popup_info__duration detail">
                            {duration}
                        </div>
                    </div>
                    <div className="popup_info__dont_knows">
                        <div className="popup_info__dont_knows title">
                            Don't Know Responses
                        </div>
                        <div className="popup_info__dont_knows detail">
                            {dont_knows}
                        </div>
                    </div>
                    <div className="popup_info__integer_outliers">
                        <div className="popup_info__integer_outliers title">
                            Integer Outliers
                        </div>
                        <div className="popup_info__integer_outliers detail">
                            {outliers}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupInfo
