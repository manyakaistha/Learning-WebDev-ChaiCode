# CSS Fundamentals - Day 1

## Introduction to CSS
CSS (Cascading Style Sheets) is the language used to style HTML documents. It describes how elements should be rendered on screen.

## CSS Selectors

### Basic Selectors
```css
/* Element Selector */
p {
    color: blue;
}

/* Class Selector */
.highlight {
    background-color: yellow;
}

/* ID Selector */
#header {
    font-size: 24px;
}
```

### Combinators
```css
/* Descendant Selector */
div p {
    margin: 10px;
}

/* Child Selector */
div > p {
    padding: 5px;
}

/* Adjacent Sibling */
h1 + p {
    font-weight: bold;
}
```

## Box Model
- Content: The actual content of the element
- Padding: Clear space around the content
- Border: A border around the padding
- Margin: Clear space outside the border

```css
.box {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
}
```

## Colors and Typography
```css
.text-styling {
    color: #333333;
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
}
```

## Units in CSS
- Absolute Units: px, pt, cm, mm
- Relative Units: em, rem, %, vh, vw

```css
.container {
    width: 80%;
    max-width: 1200px;
    font-size: 1.2rem;
}
```

## Best Practices
1. Use meaningful class names
2. Maintain consistent naming conventions
3. Group related styles together
4. Comment your code for clarity
5. Avoid inline styles when possible

## Exercise
Create a simple webpage applying these concepts:
- Use different types of selectors
- Implement the box model
- Experiment with colors and typography
- Practice using various units