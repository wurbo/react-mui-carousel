# React MUI Carousel

[Demo](https://react-mui-carousel.netlify.app/)

## Example

```jsx
const items = [1, 2, 3, 4].map((value) => (
    <Box height={20} width={60} key={value}>
        Item {value + 1}
    </Box>
))

return <Box width={120}>
    <Carousel items={items} />
</Box>
```