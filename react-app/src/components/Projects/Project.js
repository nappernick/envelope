import React from 'react'

function Project({ project, user }) {
    return (
        <>
            <div className="project__card_heading">
                {project.project_name}
            </div>
            <div className="project__stats">
                {user.type_id == 1 && <div className="project__owner">
                    <div className="project__owner title">
                        Project Owner:
                    </div>
                    <div className="project__owner name">
                        {project.user.first_name} {project.user.last_name}
                    </div>
                </div>}
                <div className="project__data_set">
                    <div className="project__data_set title">
                        Data Set:
                    </div>
                    <div className="project__data_set name">
                        {project.data_set.data_set_name}
                    </div>
                </div>
                <div className="project__enumerators">
                    <div className="project__enumerators title">
                        Enumerator Count:
                    </div>
                    <div className="project__enumerators count">
                        {project.enumerator_count}
                    </div>
                </div>
                <div className="project__surveys">
                    <div className="project__surveys title">
                        Surveys Count:
                    </div>
                    <div className="project__surveys count">
                        {project.survey_count}
                    </div>
                </div>
                <div className="project__health_areas">
                    <div className="project__health_areas title">
                        Health Area Count:
                    </div>
                    <div className="project__health_areas count">
                        {project.health_area_count}
                    </div>
                </div>
                <div className="project__duration_avg">
                    <div className="project__duration_avg title">
                        Average Survey Duration:
                    </div>
                    <div className="project__duration_avg count">
                        {project.avg_duration}
                    </div>
                </div>
                <div className="project__outliers">
                    <div className="project__outliers title">
                        Outlier Data Points:
                    </div>
                    <div className="project__outliers count">
                        {project.outlier_count}
                    </div>
                </div>
                <div className="project__dont_knows">
                    <div className="project__dont_knows title">
                        Don't Know Responses:
                    </div>
                    <div className="project__dont_knows count">
                        {project.dont_know_count}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project
