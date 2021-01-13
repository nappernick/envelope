import React from 'react'

function SingleDataSet() {
    const [switched, setSwitched] = useState(false)

    const handleSwitch = () => {
        setSwitched(!switched)
    }
    return (
        <>
            <tr className="projects_modal__user_list row">
                <td className="projects_modal__user_list row">
                    {dataSet.data_set_name}
                </td>
                <td className="projects_modal__user_list row">
                    {dataSet.created_at}
                </td>
                <td className="projects_modal__user_list row">
                    <Switch onChange={handleSwitch} checked={switched} />
                    {/* <input type="checkbox" /> */}
                </td>
            </tr>
        </>
    )
}

export default SingleDataSet
