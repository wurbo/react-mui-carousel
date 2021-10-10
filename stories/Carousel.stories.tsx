import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Carousel, CarouselProps } from '../src'
import { Box } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from 'emotion-theming'

const meta: Meta = {
    title: 'Welcome',
    component: Carousel,
    argTypes: {
        children: {
            control: {
                type: 'text'
            }
        }
    },
    parameters: {
        controls: { expanded: true }
    }
}

export default meta

const theme = createTheme({
    shape: {
        borderRadius: 20
    }
})

const Template: Story<CarouselProps> = (args) => (
    <ThemeProvider theme={theme}>
        <Box width={120}>
            <Carousel {...args} />
        </Box>
    </ThemeProvider>
)

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {
    items: [1, 2, 3, 4].map((value) => (
        <Box height={20} width={60} key={value}>
            Item {value + 1}
        </Box>
    ))
}
