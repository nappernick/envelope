import React from 'react'
import { Button } from "@react-md/button";
import styled from 'styled-components'
import SmallCubeGrid from '../Loaders/SmallCubeGrid';
import { areas } from "../../common/areas";

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function HealthAreaButton({ healthArea, ha_obj, index }) {
    const { setSelectedHA, spinArea, setSpinArea } = ha_obj
    const btnSpinArea = `${spinArea}-${index}`
    const handleClick = (e) => {
        e.preventDefault()
        setSpinArea(`${spinArea}-${index}`)
        setSelectedHA(healthArea.id)
    }
    console.log("AT BUTTON - LOCAL", btnSpinArea)
    console.log("AT BUTTON - STATE", spinArea)

    return (
        <>
            <StyledButton>
                <SmallCubeGrid areas={btnSpinArea} />
                <Button id="outlined-button-1" theme="primary" themeType="outline" onClick={handleClick}>
                    {healthArea.name}
                </Button>
            </StyledButton>
        </>
    )
}

export default HealthAreaButton
