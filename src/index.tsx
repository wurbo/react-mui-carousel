import React, { FC, ReactNodeArray, useCallback, useRef, useState } from 'react'

import { Grid, IconButton, useMediaQuery } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import useDraggableScroll from 'use-draggable-scroll'
import useSetInterval from 'use-set-interval'
import { styled } from '@mui/material/styles'

const CarouselRoot = styled(Grid)(({ theme }) => ({
    position: 'relative',
    overflowY: 'hidden',
    '&::-webkit-scrollbar': {
        width: 0,
        height: theme.spacing(1)
    },
    scrollbarColor: theme.palette.primary.main,
    '&::-webkit-scrollbar-thumb:horizontal': {
        background: theme.palette.primary.main,
        borderRadius:
            (typeof theme.shape.borderRadius === 'string'
                ? parseInt(theme.shape.borderRadius)
                : theme.shape.borderRadius) / 3
    },
    width: 'auto'
}))

const CarouselButton = styled(IconButton)(({ theme }) => {
    console.log('theme.shape', theme.shape)
    return {
        borderRadius: theme.shape.borderRadius
    }
})

export interface CarouselProps {
    items: ReactNodeArray
    onLastItem?: () => void
    slideAmt?: number
    itemWidth?: string
}

export const Carousel: FC<CarouselProps> = (props) => {
    const {
        items = [],
        onLastItem = () => {},
        slideAmt = 300,
        itemWidth = '0px'
    } = props
    const [hideLeftButton, setHideLeft] = useState(true)
    const [hideRightButton, setHideRight] = useState(true)
    const [showPagination, setShowPagination] = useState(false)
    const carouselRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState(false)
    const itemWidthMatches = useMediaQuery(`(min-width:${itemWidth})`)
    const serverItemMatches = items?.length <= 1 ? itemWidthMatches : false

    const { onMouseDown } = useDraggableScroll(carouselRef, {
        direction: 'horizontal'
    })

    const checkScrollPositions = useCallback(() => {
        if (!carouselRef.current) return

        const scrollPosition = carouselRef.current.scrollLeft

        // use scroll position to determine max amount carousel can scroll
        const maxScroll =
            carouselRef.current.scrollWidth -
            carouselRef.current.clientWidth -
            1

        // If scroll position greater than max scroll amount, hide right button
        const shouldHideRight = scrollPosition >= maxScroll
        setHideRight(shouldHideRight)

        if (!hideRightButton && shouldHideRight) {
            // Send event for last item reached, useful for infinite scrolling
            onLastItem()
        }

        // if scroll position is less than or equal to 0, hide left button
        const shouldHideLeft = scrollPosition <= 0
        setHideLeft(shouldHideLeft)

        // Show pagination only if both should be hidden
        setShowPagination(shouldHideLeft === false || shouldHideRight === false)
    }, [hideRightButton, hideLeftButton])

    // Every time a second (1000ms) has elapsed, check if buttons should be hidden
    useSetInterval(checkScrollPositions, 1000)

    return (
        <>
            <CarouselRoot
                onScroll={() => {
                    checkScrollPositions()
                }}
                onMouseDown={(event) => {
                    setDragging(true)
                    onMouseDown(event)
                }}
                onMouseUp={() => {
                    setDragging(false)
                }}
                spacing={1}
                wrap="nowrap"
                container
                ref={carouselRef}
                sx={{
                    pb: 1,
                    scrollBehavior: dragging ? 'auto' : 'smooth',
                    justifyContent: serverItemMatches ? 'center' : 'unset'
                }}
            >
                {items.map((item, num) => {
                    return (
                        <Grid item key={'item-' + num}>
                            {item}
                        </Grid>
                    )
                })}
            </CarouselRoot>

            {showPagination && (
                <Grid
                    container
                    justifyContent="center"
                    spacing={1}
                    sx={{ pt: 1 }}
                >
                    <Grid item>
                        <CarouselButton
                            disabled={hideLeftButton}
                            color="primary"
                            onClick={() => {
                                if (!carouselRef.current) return
                                carouselRef.current.scrollLeft -= slideAmt
                            }}
                            aria-label="prev"
                        >
                            <ChevronLeftIcon fontSize="medium" />
                        </CarouselButton>
                    </Grid>
                    <Grid item>
                        <CarouselButton
                            disabled={hideRightButton}
                            color="primary"
                            onClick={() => {
                                if (!carouselRef.current) return
                                carouselRef.current.scrollLeft += slideAmt
                            }}
                            aria-label="next"
                        >
                            <ChevronRightIcon fontSize="medium" />
                        </CarouselButton>
                    </Grid>
                </Grid>
            )}
        </>
    )
}
