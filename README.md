# React drag guide lines

A React Library to enable draglines for perfect placement of draggable items

You can check the demo [here](https://karrthikreddychinasani.github.io/react-drag-guide-lines/)

## Usage

using npm

```bash
npm i -S react-drag-guide-lines
```

using yarn

```bash
yarn add -S react-drag-guide-lines
```

### Parent Component

Add the following import to your parent component

#### Parent import

```tsx
import { ReactAlignLinesContainer } from 'react-drag-guide-lines';
```

#### Parent code

instead of your parent you can wrap your draggable children with the following code

```tsx
return (
  <ReactAlignLinesContainer styles={{...yourprops}}>
    {draggableComponents.map(item => <YourComponent {...props}>)}
  </ReactAlignLinesContainer>
)
```

#### Parent Props

| Title            | About                     | Required |       type                                |    Values              | Default Values |
| --------------- | ------------------------- | -------- | ----------------------------------- | ---------------------- | ---------- |
| emptyState      | Empty state component if there are no children, shows up when showEmptyState is true or children is empty list | true |ReactNode       | ReactNode| undefined |
| showEmptyState (depricated)  | boolean to check if we need to show empty state or not | false | boolean      | true, false | false |
| limit           | Limit the lines to the boundaries | false |boolean                        | true, false | false |
| styles          | Styles for the wrapper, horizontal Lines and Vertical Lines  | false | [styles](#styles) | [values](#default-values)  | undefined |
| directions | when the item is dragged it specifies when to show the draglines | false | string[] | sub array of ['tt', 'bb', 'll', 'rr', 'hc', 'wc', 'lr', 'rl', 'tb', 'bt'] | ['tt', 'bb', 'll', 'rr', 'hc', 'wc', 'lr', 'rl', 'tb', 'bt'] [more here](#directions)|

##### Styles

Styles required to pass from parent for different styles like backgroundColor, width or height

###### Type

```tsx
{
  wrapper?: React.CSSProperties,
  xLineStyle?: React.CSSProperties,
  yLineStyle?: React.CSSProperties,
}
```

###### Default Values

```tsx
{
  wrapper: { ...wrapperStyles },
  xLineStyle: { ...horizontalStyles },
  yLineStyle: { ...verticalStyles },
}
```

##### Directions

directions is a collection of array which specifies when to show the drag lines.

values are collection of the bottom options provided.

###### possible values

| option      | explanation       |
| ----------- | ----------------- |
| tt          | top of the dragging element and top of the relative elements |
| bb          | bottom of the dragging element and bottom of the relative elements |
| ll          | left side of the dragging element and left of the relative elements |
| rr          | right side of the dragging element and right of the relative elements |
| hc          | center of heights of dragging element and the relative elements |
| wc          | center of widths of dragging element and the relative elements |
| lr          | left of the dragging element and the right of the relative element |
| rl          | right of the dragging element and the left of the relative elements |
| tb          | top of the dragging element and the bottom of the relative element |
| bt          | bottom of the dragging element and the top of the relative element |

###### example

directions: ['tt', 'bb', 'll', 'rr', 'hc', 'wc', 'lr', 'rl', 'tb', 'bt']

### Child Component

#### import

```tsx
import { IDragOperations } from 'react-drag-guide-lines';
```

#### Props

to your props you can add a new Prop dragOperations with `IDragOperations` as type

```tsx
interface IChildProps {
  // your props
  dragOperations?: IDragOperations
}
```

#### Child Code

add `data-x` and `data-y` props to your child props and use the functions of IDragOperations appropriately

```tsx
const ChildComponent = (props: IChildProps) => {
  const {  dragOperations, ...rest } = props;

  // call this function when you end dragging
  const handleDragEnd = () => {
        // your code
        dragOperations?.onDragStop();
    };

    // call this function when you start dragging
    const handleDragStart = () => {
        // Your code
        dragOperations?.onDragStart();
    };

    // call this function when you are dragging
    const handleDragging = () => {
        // Your code
        // dragX - difference between current x position and previous x position
        // dragY - difference between current y position and previous y position
        dragOperations?.onDrag({ x: dragX, y: dragY });
    };

    return (
        <DragComponent
          // your props
          data-x={currentXPosition}
          data-y={currentYPosition}
        />
    );
}

export default ChildComponent;
```

You can check the example code [here](https://github.com/KarrthikReddyChinasani/react-drag-guide-lines/tree/main/example)

<center>

![Made with love in India](https://madewithlove.now.sh/in?template=flat-square)

</center>
