# CSS Fundamentals - Day 1

## CSS Layout

### Display Property
```css
/* Common display values */
.element {
    display: block;
    display: inline;
    display: inline-block;
    display: flex;
    display: grid;
    display: none;
}
```

### Positioning
```css
/* Static (default) */
.static {
    position: static;
}

/* Relative */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* Absolute */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

/* Fixed */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

/* Sticky */
.sticky {
    position: sticky;
    top: 0;
}
```

## Flexbox
```css
.flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.flex-item {
    flex: 1;
    /* or specific values */
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
```

## Float and Clear
```css
.float-left {
    float: left;
}

.float-right {
    float: right;
}

.clear-fix::after {
    content: "";
    display: table;
    clear: both;
}
```

## Z-Index and Stacking Context
```css
.layer-1 {
    z-index: 1;
}

.layer-2 {
    z-index: 2;
}

.stacking-context {
    position: relative;
    z-index: 0;
}
```

## Best Practices
1. Use Flexbox for one-dimensional layouts
2. Consider mobile-first approach
3. Avoid using float for layouts
4. Use clear naming conventions
5. Keep layouts responsive

## Exercise
Create a responsive layout using:
- Flexbox containers
- Different positioning methods
- Z-index for layering
- Proper clearing techniques