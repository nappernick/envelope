import React from 'react'
import { Button } from "@react-md/button";
import styled from 'styled-components'

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function HealthAreaButton({ healthArea, setSelectedHA }) {
    const handleClick = (e) => {
        e.preventDefault()
        setSelectedHA(healthArea.id)
    }

    return (
        <StyledButton>
            <Button id="outlined-button-1" theme="primary" themeType="outline" onClick={handleClick}>
                {healthArea.name}
            </Button>
        </StyledButton>
    )
}

export default HealthAreaButton
