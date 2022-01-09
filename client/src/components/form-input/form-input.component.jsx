import React from 'react'
import { FormInputContainer, GroupContainer, FormInputLabel } from './form-input.styles'

// import './form-input.styles.scss'

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <GroupContainer>
            <FormInputContainer
                onChange={handleChange}
                autoComplete="off"
                {...otherProps}
            />
            {
                label ? 
                (
                    <FormInputLabel className={`${otherProps.value.length ? 'shrink' : ''}`}>
                    {label}
                    </FormInputLabel>
                )
                : null
            }
        </GroupContainer>
    )
}

export default FormInput
