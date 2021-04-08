import React from 'react'
import { shortConfigDate, decimalToMinSec, dateToLocalTime } from '../../utils';
import "./PopupInfo.css"

function PopupInfo({ popUpInfo }) {
    const { administered, duration, enumerator, dont_knows, outliers, respondent } = popUpInfo
    return (
        <>
            <div width={240} height={240} className="popup_info__container">
                <div className="popup_info__enumerator header">
                    Enumerator #{enumerator}
                </div>
                <div className="popup_info__details">
                    <div className="popup_info__administered_date container">
                        <div className="popup_info__administered title">
                            Date Administered
                        </div>
                        <div className="popup_info__administered detail">
                            {shortConfigDate(administered)}
                        </div>
                    </div>
                    <div className="popup_info__administered_time container grey">
                        <div className="popup_info__administered title">
                            Local Time
                        </div>
                        <div className="popup_info__administered detail">
                            {dateToLocalTime(administered)}
                        </div>
                    </div>
                    <div className="popup_info__respondent container">
                        <div className="popup_info__respondent title">
                            Respondent
                        </div>
                        <div className="popup_info__respondent detail">
                            {respondent}
                        </div>
                    </div>
                    <div className="popup_info__duration container grey">
                        <div className="popup_info__duration title">
                            Duration
                        </div>
                        <div className="popup_info__duration detail">
                            {decimalToMinSec(duration)}
                        </div>
                    </div>
                    <div className="popup_info__integer_outliers container">
                        <div className="popup_info__integer_outliers title">
                            Integer Outliers
                        </div>
                        <div className="popup_info__integer_outliers detail">
                            {outliers}
                        </div>
                    </div>
                    <div className="popup_info__dont_knows container grey">
                        <div className="popup_info__dont_knows title">
                            Don't Know Responses
                        </div>
                        <div className="popup_info__dont_knows detail">
                            {dont_knows}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupInfo
